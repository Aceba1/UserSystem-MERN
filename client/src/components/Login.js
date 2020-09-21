import React from 'react'
import Button from './Button'
import Form from './Form'
import { login } from '../utils/userInput'
import { loginReq } from '../utils/userRequest'

export default function Login(props) {
  return (
    <div>
      <h1>Login</h1>
      <div>
        <Form
          id='login-form'
          title='Enter your login information'
          inputs={login}
          submitFunc={ loginReq }
        />
        { props.loggedIn ? (
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
