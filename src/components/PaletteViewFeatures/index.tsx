import PaletteCode from '../PaletteCode';
import PaletteImage from '../PaletteImage';

// Component responsible for assembling the view post upload.
export default function PaletteViewFeatures() {
  return (
    <section className='palette-view-features'>
      <PaletteImage />
      <PaletteCode />
    </section>
  );
}
