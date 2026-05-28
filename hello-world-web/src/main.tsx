import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  // This should never happen because index.html ships a #root div, but we
  // surface a clear message rather than silently failing if it does.
  throw new Error('Root element #root was not found in the document');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
