import React from 'react'
import Button from './Button'
import Form from './Form'
import { register } from '../utils/userInput'
import { regReq } from '../utils/userRequest'


export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <div>
        <Form
          id='register-form'
          title='Create an account'
          inputs={register}
          submitFunc={ regReq }
        />
        
        <label>Already have an account?</label><br/>
        <Button 
          text='Login' 
          onClick={() => { window.location = '/login' }} 
        />
      </div>
    </div>
  )
}
