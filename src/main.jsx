import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NoteApp from './App';
import 'react-toastify/dist/ReactToastify.css';
import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <NoteApp />
    <ToastContainer className="toast-container" theme="dark" stacked />
  </BrowserRouter>,
);
