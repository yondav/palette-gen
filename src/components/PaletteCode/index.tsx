import { useCallback, useMemo, useState } from 'react';

import { ImagePalette } from '../../contexts';
import { hexToHsl, hexToRgb } from '../../utils';
import Button from '../Button';
import CopyButton from '../CopyButton';

/**
 * A component to display the color palette in different formats and color notations.
 *
 * @component
 */
export default function PaletteCode() {
  const {
    state: { palette },
  } = ImagePalette.use();

  const [paletteVariables, setPaletteVariables] = useState<'json' | 'css'>('json');
  const [colorFormat, setColorFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');

  // Toggles between the 'hex', 'rgb', and 'hsl' color notations.
  const handleColorFormat = useCallback(() => {
    if (colorFormat === 'hex') setColorFormat('rgb');
    if (colorFormat === 'rgb') setColorFormat('hsl');
    if (colorFormat === 'hsl') setColorFormat('hex');
  }, [colorFormat]);

  const formattedPalette = useMemo(() => {
    const obj = palette ?? {};

    /**
     * Converts a color value to the specified format ('rgb' or 'hsl').
     *
     * @param {string | Record<string, string>} v - The color value to be converted.
     * @param {'rgb' | 'hsl' | 'hex'} format - The desired color notation format.
     * @returns {string | Record<string, string>} The converted color value.
     */
    const convertValue = (
      v: string | Record<string, string>,
      format: 'rgb' | 'hsl' | 'hex'
    ) => {
      if (typeof v === 'string' && format !== 'hex') {
        const converted = convertColorFormat(v, format);
        return converted ? converted : v;
      } else if (typeof v === 'object' && format !== 'hex') {
        const valueEntries = Object.entries(v);

        const convertedEntries = valueEntries.map(([valueK, valueV]) => {
          const converted = convertColorFormat(valueV, format);
          return converted ? [valueK, converted] : [valueK, valueV];
        });

        return Object.fromEntries(convertedEntries);
      }
      return v;
    };

    /**
     * Converts a color value to 'rgb' or 'hsl' format.
     *
     * @param {ImagePalette.HEX | string} color - The color value to be converted.
     * @param {'rgb' | 'hsl'} format - The desired color notation format.
     * @returns {string | null} The converted color value in the specified format, or null if conversion is not possible.
     */
    const convertColorFormat = (
      color: ImagePalette.HEX | string,
      format: 'rgb' | 'hsl'
    ) => {
      if (format === 'rgb') {
        const rgb = hexToRgb(color);
        return rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : null;
      } else if (format === 'hsl') {
        const hsl = hexToHsl(color);
        return hsl ? `hsl(${hsl[0]}deg, ${hsl[1]}%, ${hsl[2]}%)` : null;
      }
      return null;
    };

    const entries = Object.entries(obj);

    return Object.fromEntries(
      entries.map(([k, v]) => [k, convertValue(v as string, colorFormat)])
    );
  }, [colorFormat, palette]);

  const sortedPalette = useMemo(() => {
    const obj = formattedPalette ?? {};
    const entries = Object.entries(obj);

    /**
     * Sorts entries in the object alphabetically based on keys, but keeps non-string values at the end.
     *
     * @param {[string, string | Record<string, string>]} a - The first entry to compare.
     * @param {[string, string | Record<string, string>]} b - The second entry to compare.
     * @returns {number} A negative, zero, or positive number depending on the comparison result.
     */
    const sortedEntries = entries.sort(([keyA, valueA], [keyB, valueB]) => {
      if (typeof valueA === 'string' && typeof valueB === 'string')
        return keyA.localeCompare(keyB);

      return 0;
    });

    return Object.fromEntries(sortedEntries);
  }, [formattedPalette]);

  const jsonPalette = useMemo(
    () => JSON.stringify(sortedPalette, null, 2),
    [sortedPalette]
  );

  const cssPalette = useMemo(() => {
    return Object.entries(sortedPalette).reduce((css, [k, v]) => {
      if (typeof v === 'string') return css + `--${k}: ${v};\n`;
      else {
        const colorVariables = Object.entries(v).map(
          ([colorK, colorV]) => `--${k}-${colorK}: ${colorV};`
        );
        return css + colorVariables.join('\n') + '\n';
      }
    }, '');
  }, [sortedPalette]);

  const paletteCode = useMemo(
    () => (paletteVariables === 'css' ? cssPalette : jsonPalette),
    [cssPalette, jsonPalette, paletteVariables]
  );

  return (
    <div className='container'>
      <header>
        <div className='flex gap-2'>
          <Button copy='json' onClick={() => setPaletteVariables('json')} />
          <Button copy='css' onClick={() => setPaletteVariables('css')} />
        </div>
        <div>
          <Button copy={colorFormat} onClick={handleColorFormat} />
        </div>
      </header>
      <div className='relative'>
        <CopyButton content={paletteCode} />
        <pre className='palette-code'>{paletteCode}</pre>
      </div>
    </div>
  );
}
