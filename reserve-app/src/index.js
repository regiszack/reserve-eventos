import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'
import { HashRouter, Route } from 'react-router-dom'

import reducers from './reducers'

import Full from './containers/Full/'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <HashRouter>
      <Route path="/" name="MAiS" component={Full} />
    </HashRouter>
  </Provider>
  , document.getElementById('root')
)