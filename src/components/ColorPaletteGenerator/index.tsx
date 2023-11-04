import { ImagePalette } from '../../contexts';
import Shades from '../Shades';
import Swatch from '../Swatch';

/**
 * Component for displaying color palettes generated from an image.
 *
 * @component
 */
export default function ColorPaletteGenerator() {
  const { state } = ImagePalette.use();

  return (
    <section className='palette-container'>
      {state.palette && (
        <div className='palette'>
          <div className='flex gap-1'>
            <Swatch hex={state.palette.black} label='black' labelColor='white' />
            <Swatch hex={state.palette.white} label='white' labelColor='black' />
          </div>

          <div className='flex lg:flex-col gap-2'>
            <Shades color={state.palette.neutral} />
            <Shades color={state.palette.primary} />
            <Shades color={state.palette.secondary} />
            <Shades color={state.palette.accent} />
          </div>
        </div>
      )}
    </section>
  );
}
