import { useMemo } from 'react';

import type { ImagePalette } from '../../contexts';
import CopyButton from '../CopyButton';

interface SwatchProps {
  hex: ImagePalette.Color;
  label: string;
  labelColor: 'white' | 'black';
}

export default function Swatch({ hex, label, labelColor }: SwatchProps) {
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
