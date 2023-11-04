import { ImagePalette } from '../../contexts';
import Button from '../Button';

/**
 * Header component for the Palette Generator application.
 * It displays the application title and a button (if applicable) based on the view state.
 *
 * @component
 */
export default function Header() {
  const { state, actions } = ImagePalette.use();

  return (
    <header className='page-header'>
      <h1>Palette Generator</h1>
      {state.view === 'palette' && (
        <Button variant='dark' onClick={actions.clearPalette} copy='new palette' />
      )}
    </header>
  );
}
