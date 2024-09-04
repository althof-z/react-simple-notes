import React from 'react';
import App from './App';
 
const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
    <ToastContainer className="toast-container" theme="dark" stacked />
  </BrowserRouter>,
);
