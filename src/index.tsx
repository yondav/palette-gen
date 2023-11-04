import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ImagePalette } from './contexts';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ImagePalette.Provider>
    <App />
  </ImagePalette.Provider>
);
