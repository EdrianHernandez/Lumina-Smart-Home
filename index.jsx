import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

/**
 * Entry point for the Lumina Smart Home application.
 * Converted from TypeScript: Removed type guards and updated imports.
 */
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
