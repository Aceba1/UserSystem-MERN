import React, { useContext } from 'react'
import Button from './Button'
import User from '../utils/userLogin';
import Game from './Game';
import { UserState } from '../contexts/UserState';

export default function Home(props) {
  const userState = useContext(UserState);
  if (userState.active) {
    return (
      <div>
        <h1>Home</h1>
        <p>Welcome back, {userState.user.name}!</p>
        <div>
          <Game />
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