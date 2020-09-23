import React from "react";
//import logo from './logo.svg';
//import './App.css';

import ThemeController from "./components/ThemeController";
import AppRouter from "./components/AppRouter";
import Warnings from "./components/Warnings";

import useTheme from './hooks/useTheme';
import useSiteErrors from './hooks/useSiteErrors'
import useLogin from './hooks/useLogin'
import useCounter from './hooks/useCounter'

export default function App() {
  const [theme, setTheme] = useTheme();
  const [siteErrors, showSiteError, setSiteErrors, setShowSiteError] = useSiteErrors();
  const [userName, userLoggedIn] = useLogin(setSiteErrors);
  const [pageCount, clearCounter] = useCounter();

  return (
    <div id='App' className={"App " + theme}>
      <Warnings 
        items={siteErrors}
        showWarning={showSiteError}
        classStyle="top"
        hideWarning={() => {setShowSiteError(false)}}
        showHideButton={true}
      />
      <ThemeController theme={theme} setTheme={setTheme}/>
      <hr/>
      <AppRouter user={userName} loggedIn={userLoggedIn}/>
      <hr/>
    <label className='phantom-label right clickable' onClick={clearCounter} >{'View count: ' + pageCount}</label>
    <label className='phantom-label'>{userLoggedIn ? 'Logged in as ' + userName : ''}</label>
    </div>
  );
}