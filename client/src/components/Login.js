import React, { useContext } from 'react'
import Button from './Button'
import Form from './Form'
import { login as loginInput } from '../utils/userInput'
import { login as loginReq } from '../utils/userRequest'
import { UserState } from '../contexts/UserState';

export default function Login(props) {
  const userState = useContext(UserState);
  return (
    <div>
      <h1>Login</h1>
      <div>
        <Form
          id='login-form'
          title='Enter your login information'
          inputs={loginInput}
          request={loginReq}
        />
        { userState.active ? (
          <div>
            <label>Already signed in!</label><br/>
            <Button 
            text='Return Home' 
            onClick={() => { window.location = '/' }} 
            />
          </div>
        ) : (
          <div>
            <label>No account?</label><br/>
            <Button 
              text='Register' 
              onClick={() => { window.location = '/register' }} 
            />
          </div>
        )}
      </div>
    </div>
  )
}