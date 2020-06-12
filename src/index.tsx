import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const originFetch = fetch

Object.defineProperty(window, "fetch", {
  configurable: true,
  enumerable: true,
  // writable: true,
  get() {
    return (url, options) => {
      return originFetch(url, {
        ...options, ...{
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
            token: localStorage.getItem('token')
            //这里统一加token 实现请求拦截
          }, ...options.headers
        }
      })
    }
  }
});