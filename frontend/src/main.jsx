// 1. Polyfills MUST be at the very top, before React or any other imports
import { Buffer } from 'buffer';
import process from 'process';

// 2. Inject them into the global window object immediately
window.Buffer = Buffer;
window.process = process;
window.global = window;

// 3. Now import the rest of your app
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './context/SocketContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>,
);