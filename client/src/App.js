import React from "react";
// Could move AppRouter to new file, keep App.js clean

//import logo from './logo.svg';
//import './App.css';
import Button from "./components/Button.js";
import Styles from "./utils/styles";
import AppRouter from "./components/AppRouter";
//import Cookies from "./utils/cookies";

export default class App extends React.Component { //TODO: Create AppRouter

  constructor() {
    super();
    this.state = {
      style: Styles.currentStyle
    };
    document.cookie = "theme=dark;"
    console.log(document.cookie);
  }

  render() {
    return (
      <div className="App" style={this.state.style.app} >
        <Button 
          text='Set Dark'
          onClick={() => {Styles.currentStyle = Styles.dark; this.setState({style: Styles.dark});}}
          style={Styles.dark.button}
        />
        <Button 
          text='Set Light'
          onClick={() => {Styles.currentStyle = Styles.light; this.setState({style: Styles.light});}}
          style={Styles.light.button}
        />
        <AppRouter/>
      </div>
    );
  }
}