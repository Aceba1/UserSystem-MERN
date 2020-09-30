import { useState, useEffect } from "react";
import User from '../utils/userLogin'

// Change this in the future: Should only need to verify logged in state when doing authorized requests

export default function useLogin(setSiteErrors = () => {}) {
  const [userName, setUserName] = useState(User.user);
  const [userLoggedIn, setUserLoggedIn] = useState(User.loggedIn);

  useEffect(() => {
    User.verifyLoggedIn(() => {
      setUserName(User.user);
      setUserLoggedIn(true);
      console.log('Logged in!');
    }, err => {
      setSiteErrors(["Failed to keep session! Please log back in.", "Error: " + err.data.message ]);
      setUserName('');
      setUserLoggedIn(false);
      console.log('Failed to log in!');
    })
  }, [setSiteErrors]);

  return [userName, userLoggedIn];
}