import {
  ColorPaletteGenerator,
  Header,
  PaletteViewFeatures,
  PhotoUpload,
  Footer,
} from './components';
import { ImagePalette } from './contexts';
function App() {
  const {
    state: { view },
  } = ImagePalette.use();

  return (
    <>
      <Header />
      <main>
        {view === 'palette' ? <PaletteViewFeatures /> : <PhotoUpload />}
        <ColorPaletteGenerator />
      </main>
      <Footer />
    </>
  );
}

export default App;
