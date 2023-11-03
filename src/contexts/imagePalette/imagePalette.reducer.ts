import type { ImagePaletteAction, ImagePaletteState } from './imagePalette.types';

/**
 * Reducer function for the Image Palette context.
 *
 * @param {ImagePaletteState} state - The current state of the Image Palette context.
 * @param {ImagePaletteAction} action - The action object describing the state change.
 * @returns {ImagePaletteState} The updated state after applying the action.
 */
export function reducer(
  state: ImagePaletteState,
  { type, payload }: ImagePaletteAction
): ImagePaletteState {
  switch (type) {
    case 'CLEAR_PALETTE':
      return payload;

    case 'UPDATE_IMAGE_FILE':
      return { ...state, image: { ...state.image, file: payload } };

    case 'UPDATE_IMAGE_URL':
      return { ...state, image: { ...state.image, url: payload } };

    case 'GENERATE_PALETTE':
      return { ...state, palette: payload };

    case 'CHANGE_VIEW':
      return { ...state, view: payload };

    default:
      return state;
  }
}
