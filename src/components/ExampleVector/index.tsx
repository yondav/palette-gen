import { useCallback, useMemo, useState } from 'react';
import { PiCaretRight, PiCaretLeft } from 'react-icons/pi';
import colors from 'tailwindcss/colors';

import { ImagePalette } from '../../contexts';

import Cactus from './Cactus';
import Cherries from './Cherries';
import Interior from './Interior';
import Orange from './Orange';
import Pepsi from './Pepsi';

/**
 * A component that displays example vectors and allows users to navigate between them.
 *
 * @component
 */
export default function ExampleVector() {
  const { state } = ImagePalette.use();

  const [vectorIndex, setVectorIndex] = useState<number>(0);

  // An array of available vector components.
  const vectors = useMemo(() => [Interior, Orange, Cherries, Cactus, Pepsi], []);

  // The currently selected vector component.
  const Vector = useMemo(() => vectors[vectorIndex], [vectorIndex, vectors]);

  // Handles the "Next" button click to navigate to the next vector.
  const handleNext = useCallback(() => {
    const nextIndex = vectorIndex === vectors.length - 1 ? 0 : vectorIndex + 1;
    setVectorIndex(nextIndex);
  }, [vectorIndex, vectors.length]);

  // Handles the "Prev" button click to navigate to the previous vector.
  const handlePrev = useCallback(() => {
    const prevIndex = vectorIndex === 0 ? vectors.length - 1 : vectorIndex - 1;
    setVectorIndex(prevIndex);
  }, [vectorIndex, vectors.length]);

  // Defines the palette based on the application state or defaults.
  const palette = useMemo(
    () => ({
      black: state.palette?.black ?? colors.black,
      white: state.palette?.white ?? colors.white,
      neutral: state.palette?.neutral ?? colors.stone,
      primary: state.palette?.primary ?? colors.indigo,
      secondary: state.palette?.secondary ?? colors.green,
      accent: state.palette?.accent ?? colors.rose,
    }),
    [state.palette]
  );

  return (
    <div className='relative w-full max-h-[500px] h-full flex justify-center rounded-b-lg overflow-hidden text-stone-50'>
      <PiCaretLeft
        className='absolute left-0 top-1/2 -translate-y-1/2 text-6xl cursor-pointer bg-stone-950/30 rounded-full p-2 hover:bg-stone-950/50 transition-all'
        onClick={handlePrev}
      />
      <div className='rounded-b-lg overflow-hidden'>{Vector({ palette })}</div>
      <PiCaretRight
        className='absolute right-0 top-1/2 -translate-y-1/2 text-6xl cursor-pointer bg-stone-950/30 rounded-full p-2 hover:bg-stone-950/50 transition-all'
        onClick={handleNext}
      />
    </div>
  );
}
