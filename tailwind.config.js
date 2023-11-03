/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    fontFamily: {
      brand: ['Lato', ...defaultTheme.fontFamily.sans],
    },
  },
};
export const plugins = [];
