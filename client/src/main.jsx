
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from '../context/AuthContext.jsx';
// import { ChatProvider } from '../context/ChatContext.jsx';

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <AuthProvider>
//       <ChatProvider>
//       <App />
//       </ChatProvider>
//     </AuthProvider>
//   </BrowserRouter>
// )


import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ChatProvider } from '../context/ChatContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ChatProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatProvider>
    </AuthProvider>
  </React.StrictMode>
);
