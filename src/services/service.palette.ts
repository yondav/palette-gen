import type { ImagePalette } from '../contexts';
import { hslToHex, hslToRgb, rgbToHsl } from '../utils';

// Service class for working with color palettes.
export class PaletteService {
  public colors: ImagePalette.Palette;

  /**
   * Initializes the PaletteService with color data from an image.
   * @param {Uint8ClampedArray} imageData - The pixel data from an image.
   */
  constructor(imageData: Uint8ClampedArray) {
    this.colors = this.extractColors(imageData);
  }

  /**
   * Consolidate similar colors in an array based on a given color type (RGB or HSL).
   * @param {Array<ImagePalette.Centroid>} pixels - Array of colors to consolidate.
   * @param {'rgb' | 'hsl'} type - Type of colors to compare (RGB or HSL).
   * @returns {Array<ImagePalette.Centroid>} - Array of consolidated colors.
   */
  private consolidateColors(
    pixels: Array<ImagePalette.Centroid>,
    type: 'rgb' | 'hsl'
  ): Array<ImagePalette.Centroid> {
    const consolidatedPixels: Array<ImagePalette.Centroid> = [];

    const RGB_THRESHOLD = 20;
    const HUE_THRESHOLD = 15;
    const SATURATION_THRESHOLD = 12.5;
    const LIGHTNESS_THRESHOLD = 20;

    for (const pixel of pixels) {
      let isSimilar = false;

      for (const consolidatedPixel of consolidatedPixels) {
        if (type === 'rgb') {
          if (
            Math.abs(pixel[0] - consolidatedPixel[0]) <= RGB_THRESHOLD &&
            Math.abs(pixel[1] - consolidatedPixel[1]) <= RGB_THRESHOLD &&
            Math.abs(pixel[2] - consolidatedPixel[2]) <= RGB_THRESHOLD
          ) {
            isSimilar = true;
            break;
          }
        } else {
          const [h1, s1, l1] = pixel;
          const [h2, s2, l2] = consolidatedPixel;

          // Compare HSL values and check if they are similar within the threshold
          if (
            Math.abs(h1 - h2) <= HUE_THRESHOLD &&
            Math.abs(s1 - s2) <= SATURATION_THRESHOLD &&
            Math.abs(l1 - l2) <= LIGHTNESS_THRESHOLD
          ) {
            isSimilar = true;
            break;
          }
        }
      }

      if (!isSimilar) {
        consolidatedPixels.push(pixel);
      }
    }

    return consolidatedPixels;
  }

  /**
   * Extract colors from image pixel data and create a baseline color palette.
   * @param {Uint8ClampedArray} imageData - The pixel data from an image.
   * @returns {ImagePalette.Palette} - The extracted color palette.
   */
  private extractColors(imageData: Uint8ClampedArray) {
    const pixels: Array<ImagePalette.Centroid> = [];

    const PIXEL_STRIDE = 500; // Extract every 1000th pixel
    for (let i = 0; i < imageData.length; i += PIXEL_STRIDE) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];

      pixels.push([r, g, b]);
    }

    const baseline = this.findPalette(this.convertColors(pixels, 'hsl'));

    return Object.fromEntries(
      Object.entries(baseline).map(([k, v]) =>
        k === 'black' || k === 'white'
          ? [k, hslToHex(...v)]
          : [
              k,
              Object.fromEntries(
                this.createShades(v).map(([k, v]) => [k, hslToHex(...v)])
              ),
            ]
      )
    );
  }

  /**
   * Find a color palette from an array of colors.
   * @param {Array<ImagePalette.Centroid>} colors - Array of colors to build the palette from.
   * @returns {ImagePalette.Palette} - The found color palette.
   */
  private findPalette(colors: Array<ImagePalette.Centroid>): {
    [key: string]: ImagePalette.Centroid;
  } {
    const HUE_RANGE = {
      REDS: [331, 15],
      ORANGES: [16, 30],
      YELLOWS: [31, 75],
      GREENS: [76, 150],
      CYANS: [151, 195],
      BLUES: [196, 255],
      PURPLES: [256, 270],
      PINKS: [271, 330],
    };

    const hues: { [key: string]: Array<ImagePalette.Centroid> } = {
      reds: [],
      oranges: [],
      yellows: [],
      greens: [],
      cyans: [],
      blues: [],
      purples: [],
      pinks: [],
    };

    const palette: { [key: string]: ImagePalette.Centroid } = {};

    const saturated = colors.filter(c => c[1] > 0.1);

    palette.neutral = colors
      .sort((a, b) => a[1] - b[1])[0]
      .map((color, i) =>
        i !== 1 ? color : color > 0.05 ? 0.05 : color
      ) as ImagePalette.Centroid;
    palette.black = [palette.neutral[0], palette.neutral[1], 0.01];
    palette.white = [palette.neutral[0], palette.neutral[1], 0.99];

    for (const color of saturated) {
      const [h] = color;

      // Use named constants for hue ranges
      for (const [rangeName, range] of Object.entries(HUE_RANGE)) {
        const [min, max] = range;
        if (h >= min && h <= max) {
          hues[rangeName.toLowerCase()].push(color);
          break;
        }
      }
    }

    const baselineResults = Object.entries(hues)
      .filter(hue => hue[1].length > 0)
      .sort((a, b) => b[1].length - a[1].length)
      .map(([k, v]) => [k, v.sort((a, b) => b[1] - a[1])[0]]);

    const slicedResults =
      baselineResults.length <= 3
        ? (baselineResults.map((res, i) => [i, res[1]]) as Array<
            [number, ImagePalette.Centroid]
          >)
        : this.consolidateColors(
            baselineResults.map(res => res[1]) as Array<ImagePalette.Centroid>,
            'hsl'
          )
            .map((res, i) => [i, res])
            .slice(0, 3);

    palette.primary = slicedResults[0][1] as ImagePalette.Centroid;

    if (slicedResults[1])
      palette.secondary = slicedResults[1][1] as ImagePalette.Centroid;
    if (slicedResults[2]) palette.accent = slicedResults[2][1] as ImagePalette.Centroid;

    return palette;
  }

  /**
   * Convert an array of colors from one color space to another (HSL to RGB or RGB to HSL).
   * @param {Array<ImagePalette.Centroid>} colors - Array of colors to convert.
   * @param {'hsl' | 'rgb'} to - Target color space (HSL or RGB).
   * @returns {Array<ImagePalette.Centroid>} - Array of converted colors.
   */
  private convertColors(
    colors: Array<ImagePalette.Centroid>,
    to: 'hsl' | 'rgb'
  ): Array<ImagePalette.Centroid> {
    if (to === 'rgb') return colors.map(color => hslToRgb(...color));
    return colors.map(color => rgbToHsl(...color));
  }

  /**
   * Create a scale of shades based on a given color's HSL values.
   * @param {ImagePalette.Centroid} color - The base color for generating shades.
   * @returns {Array<[number, ImagePalette.Centroid]>} - Array of color shades.
   */
  private createShades(
    color: ImagePalette.Centroid
  ): Array<[number, ImagePalette.Centroid]> {
    const shadingScale: Array<[number, ImagePalette.Centroid]> = [];
    const [h, s] = color;

    const numShades = 10;
    const maxLightness = 85;
    const lightnessStep = 7.7;

    for (let i = 0; i <= numShades; i++) {
      const l = (maxLightness - i * lightnessStep) / 100; // Adjust 9.4 to control the range
      const key = i === 0 ? 50 : i === 10 ? 950 : i * 100;
      shadingScale.push([key, [h, s, Math.ceil(l * 100) / 100]]);
    }

    return shadingScale;
  }
}
