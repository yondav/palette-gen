import type { ImagePalette } from '../contexts';

/**
 * Convert HSL (Hue, Saturation, Lightness) values to a hexadecimal color code.
 *
 * @param {number} h - The hue value in degrees (0-360).
 * @param {number} s - The saturation value as a decimal between 0 and 1.
 * @param {number} l - The lightness value as a decimal between 0 and 1.
 * @returns {ImagePalette.Centroid} An RGB array with values for Red (0-255), Green (0-255), and Blue (0-255).
 */
export const hslToRgb = (h: number, s: number, l: number): ImagePalette.Centroid => {
  let r, g, b;

  if (s === 0) {
    // If saturation is 0, the color is a shade of gray
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  // Convert RGB values to the [0, 255] range
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return [r, g, b];
};
