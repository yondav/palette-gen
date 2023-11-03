import type { ImagePalette } from '../contexts';

/**
 * Convert HSL (Hue, Saturation, Lightness) values to a hexadecimal color code.
 *
 * @param h - The hue value in degrees (0-360).
 * @param s - The saturation value as a decimal between 0 and 1.
 * @param l - The lightness value as a decimal between 0 and 1.
 * @returns A hexadecimal color code string in the format "#RRGGBB".
 */
export function hslToHex(h: number, s: number, l: number): ImagePalette.HEX {
  // Ensure s and l are within valid ranges [0, 1].
  s = Math.min(1, Math.max(0, s));
  l = Math.min(1, Math.max(0, l));

  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - chroma / 2;

  let r, g, b;

  if (h >= 0 && h < 60) {
    r = chroma;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = chroma;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = chroma;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = chroma;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = chroma;
  } else {
    r = chroma;
    g = 0;
    b = x;
  }

  // Convert the RGB values to integers in the [0, 255] range.
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  // Convert the integer values to hexadecimal and format the final color code.
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}
