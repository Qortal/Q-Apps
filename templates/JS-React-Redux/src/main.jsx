import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const baseUrl = window?._qdnBase || ''
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router basename={baseUrl}>
      <App />
    </Router>
  </React.StrictMode>
)
