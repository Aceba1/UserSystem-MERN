import React from 'react'
import Button from './Button'
import User from '../utils/user';

/*window.location.origin*/ 

export default function Home(props) {
  if (props.loggedIn) {
    return (
      <div>
        <h1>Home</h1>
        <p>Welcome back, {props.user}!</p>
        <div>
          <Button text='Logout' onClick={() => { User.logOut(); window.location = '/' }} />
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>Home</h1>
        <p>Welcome! Please login or register</p>
        <div>
          <Button text='Login' onClick={() => { window.location = '/login' }} />
          <br/>
          <Button text='Register' onClick={() => { window.location = '/register' }} />
        </div>
      </div>
    )
  }
}
