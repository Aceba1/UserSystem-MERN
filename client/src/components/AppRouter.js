import React from 'react'
import Home from './Home.js';
import Login from './Login.js';
import Register from './Register.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function AppRouter(props) {
    return (
        <Router>
          <Switch>
            <Route path="/login">
              <Login user={props.user} loggedIn={props.loggedIn}/>
            </Route>
            <Route path="/register">
              <Register user={props.user} loggedIn={props.loggedIn}/>
            </Route>
            <Route path="/">
              <Home user={props.user} loggedIn={props.loggedIn}/>
            </Route>
          </Switch>
        </Router>
    )
}
