import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const app = (
  <BrowserRouter basename="index">
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
