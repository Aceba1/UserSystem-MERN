import React, { useContext } from 'react'
import Button from './Button'
import Form from './Form'
import { register as registerInput } from '../utils/userInput'
import { register as registerReq } from '../utils/userRequest'
import { UserState } from '../contexts/UserState';

export default function Register(props) {
  const userState = useContext(UserState);
  return (
    <div>
      <h1>Register</h1>
      <div>
        <Form
          id='register-form'
          title='Create an account'
          inputs={registerInput}
          request={registerReq}
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
          <label>Already have an account?</label><br/>
            <Button 
              text='Login' 
              onClick={() => { window.location = '/login' }} 
            />
          </div>
        )}
      </div>
    </div>
  )
}