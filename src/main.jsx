import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import GlobalStyles from './styles/GlobalStyle.js';
import Typography from './styles/Typography.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles />
    <Typography />
    <App />
  </StrictMode>
);
