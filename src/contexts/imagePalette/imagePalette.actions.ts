import {
  ImagePaletteActionTypes,
  type ChangeViewAction,
  type ClearContextAction,
  type GeneratePaletteAction,
  type ImageFile,
  type ImagePaletteState,
  type ImageUrl,
  type Palette,
  type UpdateImageFileAction,
  type UpdateImageUrlAction,
  type View,
} from './imagePalette.types';

/**
 * Action creator for updating the image URL in the image palette context.
 * @param {ImageUrl} url - The new image URL to set.
 * @returns {UpdateImageUrlAction} An action object to update the image URL.
 */
export const generateImageUrl = (url: ImageUrl): UpdateImageUrlAction => ({
  type: ImagePaletteActionTypes.UPDATE_IMAGE_URL,
  payload: url,
});

/**
 * Action creator for updating the image file in the image palette context.
 * @param {ImageFile} file - The new image file to set.
 * @returns {UpdateImageFileAction} An action object to update the image file.
 */
export const uploadImageFile = (file: ImageFile): UpdateImageFileAction => ({
  type: ImagePaletteActionTypes.UPDATE_IMAGE_FILE,
  payload: file,
});

/**
 * Action creator for generating a palette and updating it in the image palette context.
 * @param {Palette} palette - The generated palette to set.
 * @returns {GeneratePaletteAction} An action object to generate and update the palette.
 */
export const generatePalette = (palette: Palette): GeneratePaletteAction => ({
  type: ImagePaletteActionTypes.GENERATE_PALETTE,
  payload: palette,
});

/**
 * Action creator for clearing the image palette context.
 * @param {ImagePaletteState} state - The state of the image palette to clear.
 * @returns {ClearContextAction} An action object to clear the image palette context.
 */
export const clearPalette = (state: ImagePaletteState): ClearContextAction => ({
  type: ImagePaletteActionTypes.CLEAR_PALETTE,
  payload: state,
});

/**
 * Action creator for changing the view in the image palette context.
 * @param {View} view - The new view to set.
 * @returns {ChangeViewAction} An action object to change the view in the image palette context.
 */
export const changeView = (view: View): ChangeViewAction => ({
  type: ImagePaletteActionTypes.CHANGE_VIEW,
  payload: view,
});
