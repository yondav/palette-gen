import type { ImagePalette } from '../contexts';

import type { Nullable } from './types.generic';

/**
 * Convert a hexadecimal color code to HSL (Hue, Saturation, Lightness).
 *
 * @param {string | ImagePalette.HEX} hex - The hexadecimal color code to convert.
 * @returns {ImagePalette.Centroid | null} An HSL array with values for Hue (0-360), Saturation (0-100), and Lightness (0-100).
 * If the input is not a valid hex code, `null` is returned.
 */
export function hexToHsl(
  hex: string | ImagePalette.HEX
): Nullable<ImagePalette.Centroid> {
  // Remove the hash if it exists.
  hex = hex.replace(/^#/, '');

  // Check for valid hex input.
  if (!/^([0-9A-F]{3}){1,2}$/i.test(hex)) {
    return null;
  }

  // Convert hex to RGB.
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Normalize RGB values to the range [0, 1].
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  // Find the minimum and maximum values of RGB.
  const cMax = Math.max(rNorm, gNorm, bNorm);
  const cMin = Math.min(rNorm, gNorm, bNorm);

  // Calculate lightness.
  const l = (cMax + cMin) / 2;

  let h = 0;
  let s = 0;

  if (cMax !== cMin) {
    // Calculate hue.
    if (cMax === rNorm) {
      h = (60 * ((gNorm - bNorm) / (cMax - cMin)) + 360) % 360;
    } else if (cMax === gNorm) {
      h = 60 * ((bNorm - rNorm) / (cMax - cMin)) + 120;
    } else if (cMax === bNorm) {
      h = 60 * ((rNorm - gNorm) / (cMax - cMin)) + 240;
    }

    // Calculate saturation.
    s = (cMax === 0 ? 0 : (cMax - cMin) / cMax) * 100;
  }

  return [Math.round(h), Math.round(s), Math.round(l)];
}
