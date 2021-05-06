import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import App from './components/app/app';
import { reducer } from './Store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

export const history = createBrowserHistory();

const store = createStore(reducer, composeWithDevTools());

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById(`root`)
);
