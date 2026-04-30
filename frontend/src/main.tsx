
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/common/ScrollToTop';

const forceFavicon = () => {
  const oldIcons = document.querySelectorAll("link[rel*='icon']");
  oldIcons.forEach((icon) => icon.remove());

  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/svg+xml';
  favicon.href = `/favicon.svg?v=${Date.now()}`;

  document.head.appendChild(favicon);
};

forceFavicon();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);