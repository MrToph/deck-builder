/* eslint-env browser */
import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import App from './App'
import './index.css'

const endPoint = require('../package.json').graphql.request.url

Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(endPoint))

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)
