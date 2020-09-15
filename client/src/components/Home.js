import React from 'react'
import Button from './Button'

/*window.location.origin*/ 

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome back</p>
      <div>
        <Button text='Login' onClick={() => { window.location = '/login' }} />
        <br/>
        <Button text='Register' onClick={() => { window.location = '/register' }} />
      </div>
    </div>
  )
}
