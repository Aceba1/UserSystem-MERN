import React from "react";
// Could move AppRouter to new file, keep App.js clean

//import logo from './logo.svg';
//import './App.css';
import Button from "./components/Button.js";
import Styles from "./utils/styles";
import AppRouter from "./components/AppRouter";
//import Cookies from "./utils/cookies";
import Warnings from "./components/Warnings.js";
import User from './utils/user';

export default class App extends React.Component { //TODO: Create AppRouter

  constructor() {
    super();
    this.state = {
      style: Styles.currentStyle,
      siteErrors: [],
      showSiteError: false
    };
    this.setThemeLight = this.setThemeLight.bind(this);
    this.setThemeDark = this.setThemeDark.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
    this.failedToLogin = this.failedToLogin.bind(this);
  }
  
  componentDidMount() {
    User.verifyLoggedIn(this.loginSuccess, this.failedToLogin); // Can add TrueEvent and FalseEvent here
  }

  loginSuccess() {
    console.log('Logged in as ' + User.user + '!');
  }

  failedToLogin(error = '') {
    this.setState({
      siteErrors: [error, 'Please log back in'],
      showSiteError: true
    })
  }

  setThemeLight() { this.setTheme(Styles.light) }
  setThemeDark() { this.setTheme(Styles.dark) }

  setTheme(theme) {
    localStorage.setItem('theme', theme);
    Styles.currentStyle = theme; 
    this.setState({style: theme});
  }

  render() {
    return (
      <div id='App' className={"App " + this.state.style} /*style={this.state.style.app}*/ >
        <Warnings 
          items={this.state.siteErrors}
          showWarning={this.state.showSiteError}
        />
        <Button 
          text='Set Dark'
          onClick={this.setThemeDark}
        />
        <Button 
          text='Set Light'
          onClick={this.setThemeLight}
        />
        <hr/>
        <AppRouter user={User.user} loggedIn={User.loggedIn}/>
        <hr/>
      </div>
    );
  }
}