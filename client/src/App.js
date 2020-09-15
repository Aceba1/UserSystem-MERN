import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
// Could move AppRouter to new file, keep App.js clean

//import logo from './logo.svg';
//import './App.css';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Button from "./components/Button.js";
import Styles from "./utils/styles";

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      style: Styles.currentStyle
    };
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
  
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}