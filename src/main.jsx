import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Listen to all tel: link clicks and fire Google Ads conversion
document.addEventListener('click', (e) => {
  const target = e.target.closest('a');
  if (target && target.href && target.href.startsWith('tel:')) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {'send_to': 'AW-18444819668/EELnCMP92_ccENS5lttE'});
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
