import React from 'react'
import Button from './Button'
import Form from './Form'
import { login } from '../utils/userInput'
import { loginReq } from '../utils/userRequest'

export default function Login() {
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

        <label>No account?</label><br/>
        <Button 
          text='Register' 
          onClick={() => { window.location = '/register' }} 
        />
      </div>
    </div>
  )
}
