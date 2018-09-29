import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { registerServiceWorker } from './register-service-worker'
import './scss/app.scss'

// main app
import App from './App'

registerServiceWorker('./service-worker.js')

ReactDOM.render((
  <Router>
    <App />
  </Router>
),
document.getElementById('app')
)
