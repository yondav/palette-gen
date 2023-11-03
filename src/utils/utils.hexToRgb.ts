import type { ImagePalette } from '../contexts';

import type { Nullable } from './types.generic';

/**
 * Convert a hexadecimal color code to RGB (Red, Green, Blue).
 *
 * @param {string | ImagePalette.HEX} hex - The hexadecimal color code to convert.
 * @returns {ImagePalette.Centroid | null} An RGB array with values for Red (0-255), Green (0-255), and Blue (0-255).
 * If the input is not a valid hex code, `null` is returned.
 */
export function hexToRgb(
  hex: string | ImagePalette.HEX
): Nullable<ImagePalette.Centroid> {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');

  // Parse the hex string
  const bigint = parseInt(hex, 16);

  // Check for valid hex input
  if (isNaN(bigint) || hex.length !== 6) {
    return null;
  }

  // Extract the RGB components
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
}
