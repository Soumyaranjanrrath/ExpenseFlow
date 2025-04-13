import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application inside React Strict Mode
root.render(
  <React.StrictMode>
    <GlobalStyle /> {/* Global CSS styles */}
    <App />
  </React.StrictMode>
);
