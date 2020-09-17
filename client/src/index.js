import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import Styler from './utils/styles';
import Cookies from './utils/cookies';

// TODO: Move cooky logic to new utility
Cookies.initialize();
if (Cookies.checkValue('theme', 'light') === 'dark') {
  Styler.currentStyle = Styler.dark;
}


ReactDOM.render(
  <React.StrictMode> {/*React.StrictMode : Error-catcher*/}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//serviceWorker.unregister();
