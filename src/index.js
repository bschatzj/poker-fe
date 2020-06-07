import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './Redux/Reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'
import history from './history'

const store = createStore(reducer, applyMiddleware(thunk, logger))

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  rootElement
)
