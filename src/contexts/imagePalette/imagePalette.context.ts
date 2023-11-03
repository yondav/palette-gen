import { createContext, useContext } from 'react';

import type { ImagePaletteContext } from './imagePalette.types';

// Initial state for the ImagePaletteContext.
export const initialState: ImagePaletteContext = {
  state: {
    palette: null,
    image: {
      file: null,
      url: null,
    },
    view: 'upload',
  },
  actions: {
    uploadImageFile: () => null,
    generateImageUrl: () => null,
    generatePalette: () => null,
    changeView: () => null,
    clearPalette: () => null,
  },
};

// Create a context for the ImagePaletteContext.
export const Context = createContext<ImagePaletteContext>(initialState);

/**
 * Hook to access the ImagePaletteContext.
 *
 * @returns The ImagePaletteContext, allowing components to access and modify the image palette state.
 */
export function useImagePalette() {
  return useContext(Context);
}
