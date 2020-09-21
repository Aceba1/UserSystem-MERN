import React, { useState, useEffect } from "react";
// Could move AppRouter to new file, keep App.js clean

//import logo from './logo.svg';
//import './App.css';
import Button from "./components/Button.js";
import Styles from "./utils/styles";
import AppRouter from "./components/AppRouter";
//import Cookies from "./utils/cookies";
import Warnings from "./components/Warnings.js";
import User from './utils/user';

// Move hooks to utils! 'use<State>.js'

function useTheme() {
  const [theme, setTheme] = useState(Styles.currentStyle);
  useEffect(() => {
    localStorage.setItem('theme', theme);
    Styles.currentStyle = theme;
  }, [theme]);
  return [theme, setTheme];
}

function useSiteErrors() {
  const [siteErrors, setSiteErrors] = useState();
  const [showSiteError, setShowSiteError] = useState(false);

  useEffect(() => {
    setShowSiteError(siteErrors !== undefined);
  }, [siteErrors]);
  return [siteErrors, showSiteError, setSiteErrors, setShowSiteError];
}

function useLogin(setSiteErrors = () => {}) {
  const [userName, setUserName] = useState(User.user);
  const [userLoggedIn, setUserLoggedIn] = useState(User.loggedIn);

  useEffect(() => {
    User.verifyLoggedIn(() => {
      setUserName(User.user);
      setUserLoggedIn(true);
      console.log('Logged in!');
    }, err => {
      setSiteErrors(["Failed to keep session! Please log back in.", "Error: " + err.data.message ]);
      setUserName('');
      setUserLoggedIn(false);
      console.log('Failed to log in!');
    })
  }, [setSiteErrors]);

  return [userName, userLoggedIn];
}

const windowPath = JSON.stringify(window.location.pathname);
const _pageViewNum = 1 + (JSON.parse(localStorage.getItem(windowPath))) ?? 0;
    localStorage.setItem(windowPath, _pageViewNum);

function useCounter() {
  const [counter, setCounter] = useState(_pageViewNum);

  const clearCounter = () => { setCounter(0); localStorage.removeItem(windowPath) }
  return [counter, clearCounter];
}

export default function App() {
  const [theme, setTheme] = useTheme();
  const [siteErrors, showSiteError, setSiteErrors, setShowSiteError] = useSiteErrors();
  const [userName, userLoggedIn] = useLogin(setSiteErrors);
  const [pageCount, clearCounter] = useCounter();

  return (
    <div id='App' className={"App " + theme} /*style={this.state.style.app}*/ >
      <Warnings 
        items={siteErrors}
        showWarning={showSiteError}
        classStyle="top"
        hideWarning={() => {setShowSiteError(false)}}
        showHideButton={true}
      />
      <Button 
        text='Set Dark'
        onClick={() => {setTheme(Styles.dark)}}
      />
      <Button 
        text='Set Light'
        onClick={() => {setTheme(Styles.light)}}
      />
      <hr/>
      <AppRouter user={userName} loggedIn={userLoggedIn}/>
      <hr/>
    <label className='phantom-label right clickable' onClick={clearCounter} >{'View count: ' + pageCount}</label>
    <label className='phantom-label'>{userLoggedIn ? 'Logged in as ' + userName : ''}</label>
    </div>
  );
}