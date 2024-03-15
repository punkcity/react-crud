import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

//This did not work forme! => ReactDOM.render( <>..</>, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
