import React, { useState, useEffect } from "react";
//import logo from './logo.svg';
//import './App.css';

import ThemeController from "./components/ThemeController";
import AppRouter from "./components/AppRouter";
import Warnings from "./components/Warnings";
import UserStateProvider from "./contexts/UserState";

import useSiteErrors from './hooks/useSiteErrors'
import Footer from "./components/Footer";
import { Theme } from "./contexts/Theme";

export default function App() {
  //const [siteErrors, showSiteError, setSiteErrors, setShowSiteError] = useSiteErrors();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') ?? 'light';
  });
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div id='App' className={"App " + theme}>
      <UserStateProvider>
        <Theme.Provider value={{theme: theme, setTheme: setTheme}}>
          {/* <Warnings 
            items={siteErrors}
            showWarning={showSiteError}
            classStyle="top"
            hideWarning={() => {setShowSiteError(false)}}
            showHideButton={true}
          /> */}
          <ThemeController/>
          <hr/>
          <AppRouter/>
          <hr/>
          <Footer/>
        </Theme.Provider>
      </UserStateProvider>
    </div>
  );
}