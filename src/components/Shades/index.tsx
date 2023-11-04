import type { ImagePalette } from '../../contexts';
import Swatch from '../Swatch';

interface ShadeProps {
  color?: ImagePalette.ColorShades;
}

/**
 * Displays the shades of a color, if available.
 *
 * @param {ImagePalette.ColorShades} color - An object containing color shades.
 */
export default function Shades({ color }: ShadeProps) {
  return (
    <>
      {color && (
        <div className='swatch-shades'>
          {Object.entries(color).map(([k, v], i) => (
            <Swatch
              key={`accent-${k}`}
              hex={v}
              label={k}
              labelColor={i > 4 ? 'white' : 'black'}
            />
          ))}
        </div>
      )}
    </>
  );
}
