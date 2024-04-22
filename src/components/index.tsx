import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './BasketSide.tsx';
import reportWebVitals from './reportWebVitals.ts';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
If you want to start measuring performance in your app, pass a function
 to log results (for example: reportWebVitals(console.log))
 or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
reportWebVitals();
