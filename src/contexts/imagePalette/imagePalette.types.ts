import type { Nullable } from '../../utils';

// Represents an array of 3 numbers that would be formatted as a string for an RGB or HSL color value.
export type Centroid = [number, number, number];

// Represents color types.
export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;
export type HSL = `hsl(${number}, ${number}%, ${number}%)`;
export type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;

// Represents an acceptable color value.
export type Color = RGB | RGBA | HEX | HSL | HSLA;

// Represents the shading scale of a given color value.
export type Shades = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

// Represents the shading scale of a given color with assigned values.
export type ColorShades = { [key in Shades]: Color };

// Represents the shape of a color palette.
export type Palette = {
  neutral: ColorShades;
  black: Color;
  white: Color;
} & { [key: string]: ColorShades };

// Represents the values surrounding an uploaded image.
export type ImageFile = File;
export type ImageUrl = string;

// Represents the two view states of the application.
export type View = 'upload' | 'palette';

// Represents the context state of the application.
export interface ImagePaletteState {
  palette: Nullable<Palette>;
  image: {
    file: Nullable<ImageFile>;
    url: Nullable<ImageUrl>;
  };
  view: View;
}

// Represents the entire context object of the application.
export interface ImagePaletteContext {
  state: ImagePaletteState;
  actions: {
    uploadImageFile: (payload: ImageFile) => void;
    generateImageUrl: (payload: ImageUrl) => void;
    generatePalette: (payload: Palette) => void;
    changeView: (payload: View) => void;
    clearPalette: () => void;
  };
}

// Represents the action types for mutating the context state.
export enum ImagePaletteActionTypes {
  UPDATE_IMAGE_URL = 'UPDATE_IMAGE_URL',
  UPDATE_IMAGE_FILE = 'UPDATE_IMAGE_FILE',
  GENERATE_PALETTE = 'GENERATE_PALETTE',
  CLEAR_PALETTE = 'CLEAR_PALETTE',
  CHANGE_VIEW = 'CHANGE_VIEW',
}

// Define action objects
export interface UpdateImageFileAction {
  type: typeof ImagePaletteActionTypes.UPDATE_IMAGE_FILE;
  payload: ImageFile;
}
export interface UpdateImageUrlAction {
  type: typeof ImagePaletteActionTypes.UPDATE_IMAGE_URL;
  payload: ImageUrl;
}

export interface GeneratePaletteAction {
  type: typeof ImagePaletteActionTypes.GENERATE_PALETTE;
  payload: Palette;
}

export interface ClearContextAction {
  type: typeof ImagePaletteActionTypes.CLEAR_PALETTE;
  payload: ImagePaletteState;
}

export interface ChangeViewAction {
  type: typeof ImagePaletteActionTypes.CHANGE_VIEW;
  payload: View;
}

// Export all action types and action creators
export type ImagePaletteAction =
  | UpdateImageFileAction
  | UpdateImageUrlAction
  | GeneratePaletteAction
  | ClearContextAction
  | ChangeViewAction;
