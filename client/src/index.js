import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import Styler from './utils/styles';
import User from './utils/userLogin';

// Initialize client

User.initialize();

const theme = localStorage.getItem('theme');
if (theme) {
  Styler.setCurrentStyle(theme);
}


// Render client

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
