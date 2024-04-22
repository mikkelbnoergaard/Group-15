import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './BasketSide.tsx'
import './index.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
