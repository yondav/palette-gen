import { useMemo } from 'react';

import type { ImagePalette } from '../../contexts';
import CopyButton from '../CopyButton';

interface SwatchProps {
  hex: ImagePalette.Color;
  label: string;
  labelColor: 'white' | 'black';
}

/**
 * Swatch component to display a color swatch along with its label and hexadecimal value.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {string} props.hex - The hexadecimal color code to display.
 * @param {string} props.label - The label or name of the color.
 * @param {('white' | 'black')} props.labelColor - The color of the label text ('white' or 'black').
 */
export default function Swatch({ hex, label, labelColor }: SwatchProps) {
  /**
   * Calculates the text color class based on the `labelColor` prop.
   *
   * @type {string} - The CSS class for the text color.
   */
  const textColor = useMemo(
    () => (labelColor === 'white' ? 'text-stone-50' : 'text-stone-950'),
    [labelColor]
  );

  return (
    <div className='swatch' style={{ backgroundColor: hex }}>
      <CopyButton hidden content={hex} />
      <span className={textColor}>{label}</span>
      <span className={textColor}>{hex}</span>
    </div>
  );
}
