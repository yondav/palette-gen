import { useCallback, useState } from 'react';

import { ImagePalette } from '../../contexts';
import Button from '../Button';
import ExampleVector from '../ExampleVector';

/**
 * Displays either an uploaded image or example vectors based on the state.
 *
 * @component
 */
export default function PaletteImage() {
  const {
    state: { image },
  } = ImagePalette.use();

  const [imageState, setImageState] = useState<'uploaded' | 'vectors'>('uploaded');

  // Toggles between the 'uploaded' and 'vectors' states.
  const handleImageState = useCallback(() => {
    if (imageState === 'uploaded') setImageState('vectors');
    if (imageState === 'vectors') setImageState('uploaded');
  }, [imageState]);

  return (
    <div className='container'>
      <header>
        <Button copy={imageState} onClick={handleImageState} />
      </header>
      {imageState === 'uploaded' ? (
        image.url && <img src={image.url} alt='Uploaded' className='uploaded-image' />
      ) : (
        <ExampleVector />
      )}
    </div>
  );
}
