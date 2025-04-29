import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'

import './index.css'
import { TranslationProvider } from './context/TranlationContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TranslationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </TranslationProvider>
    </BrowserRouter>
  </React.StrictMode>,
)