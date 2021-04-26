import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import './index.css';
import App from "./components/app/app";

export const history = createBrowserHistory();

render(
  <Router history={history}>
    < App/>
  </Router>,
  document.getElementById(`root`));
