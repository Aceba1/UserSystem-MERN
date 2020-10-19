import React, {createContext, useState} from 'react';
import UserLogin from '../utils/userLogin';
export const UserState = React.createContext()

export default function UserStateProvider(props) {
  const [loginState, setLoginState] = useState({active: UserLogin.loggedIn, verified: false, user: UserLogin.user})
  return (
    <UserState.Provider value={{...loginState, setState: setLoginState}}>
      {props.children}
    </UserState.Provider>
  )
}
