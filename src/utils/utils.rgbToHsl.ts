import type { ImagePalette } from '../contexts';

/**
 * Convert HSL (Hue, Saturation, Lightness) values to a RGB (Red, Green, Blue) color code.
 *
 * @param {number} h - The hue value in degrees (0-360).
 * @param {number} s - The saturation value as a decimal between 0 and 1.
 * @param {number} l - The lightness value as a decimal between 0 and 1.
 * @returns {ImagePalette.Centroid} An RGB array with values for Red (0-255), Green (0-255), and Blue (0-255).
 */
export const rgbToHsl = (r: number, g: number, b: number): ImagePalette.Centroid => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s;
  let l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // grayscale
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h = Math.round(h * 60); // Map to [0, 360] degrees
  }

  return [h, Math.round(s * 100) / 100, Math.round(l * 100) / 100];
};
