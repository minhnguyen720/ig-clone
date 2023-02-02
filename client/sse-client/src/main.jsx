import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from './contexts/authContext';
import WebsocketContextProvider from './contexts/websocketContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WebsocketContextProvider>
      <AuthContextProvider>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
    </WebsocketContextProvider>
  </React.StrictMode>,
);
