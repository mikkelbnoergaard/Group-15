import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.ts';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
reportWebVitals();
