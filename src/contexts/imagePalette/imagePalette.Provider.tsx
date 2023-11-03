import { useReducer, useMemo, useCallback, useEffect, type ReactNode } from 'react';

import { PaletteService } from '../../services/service.palette';

import * as actions from './imagePalette.actions';
import { Context, initialState } from './imagePalette.context';
import { reducer } from './imagePalette.reducer';
import type { ImageFile, ImageUrl, Palette, View } from './imagePalette.types';

interface ProviderProps {
  children: ReactNode;
}

/**
 * Provides the Image Palette context to the application.
 *
 * @param {ProviderProps} props - Props for the Image Palette context provider.
 * @returns {ReactNode} The children components wrapped with the Image Palette context.
 */
export function Provider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState.state);

  const uploadImageFile = useCallback((payload: ImageFile) => {
    dispatch(actions.uploadImageFile(payload));
  }, []);

  const generateImageUrl = useCallback((payload: ImageUrl) => {
    dispatch(actions.generateImageUrl(payload));
  }, []);

  const generatePalette = useCallback((payload: Palette) => {
    dispatch(actions.generatePalette(payload));
  }, []);

  const changeView = useCallback((payload: View) => {
    dispatch(actions.changeView(payload));
  }, []);

  const clearPalette = useCallback(() => {
    dispatch(actions.clearPalette(initialState.state));
  }, []);

  const value = useMemo(
    () => ({
      state,
      actions: {
        uploadImageFile,
        generateImageUrl,
        generatePalette,
        changeView,
        clearPalette,
      },
    }),
    [changeView, clearPalette, generateImageUrl, generatePalette, state, uploadImageFile]
  );

  useEffect(() => {
    if (state.image.file) {
      const img = new Image();
      img.src = URL.createObjectURL(state.image.file);
      img.onload = () => {
        generateImageUrl(img.src); // Set the image URL for rendering
        changeView('palette');

        // Calculate the proportional height based on a fixed width (e.g., 500px)
        const targetWidth = 500;
        const aspectRatio = img.width / img.height;
        const targetHeight = targetWidth / aspectRatio;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        if (ctx) {
          // Draw the image with the new dimensions
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Extract colors from the canvas
          const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight).data;
          generatePalette(new PaletteService(imageData).colors);
        }
      };
    }
  }, [changeView, generateImageUrl, generatePalette, state.image.file]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
