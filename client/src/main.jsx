import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrapping App with Router */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
