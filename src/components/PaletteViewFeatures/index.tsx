import PaletteCode from '../PaletteCode';
import PaletteImage from '../PaletteImage';

/**
 * Component responsible for assembling the view post-upload. It includes both the image display
 * and the color palette code display.
 *
 * @component
 */
export default function PaletteViewFeatures() {
  return (
    <section className='palette-view-features'>
      <PaletteImage />
      <PaletteCode />
    </section>
  );
}
