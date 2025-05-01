
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'

// Add rainbow button color variables to the document root
document.documentElement.style.setProperty('--color-1', '258 53% 58%'); // purple
document.documentElement.style.setProperty('--color-2', '300 80% 60%'); // magenta
document.documentElement.style.setProperty('--color-3', '180 80% 60%'); // cyan
document.documentElement.style.setProperty('--color-4', '120 80% 60%'); // green
document.documentElement.style.setProperty('--color-5', '30 80% 60%');  // orange

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
