import React, { useContext } from 'react'
import { UserState } from '../contexts/UserState';
import useCounter from '../hooks/useCounter'


export default function Footer() {
  const userState = useContext(UserState);
  const [pageCount, clearCounter] = useCounter();
  return (
    <div>
      <label className='phantom-label right clickable' onClick={clearCounter} >{'View count: ' + pageCount}</label>
      <label className='phantom-label'>{userState.active ? 'Logged in as ' + userState.user.name : ''}</label>
    </div>
  )
}
