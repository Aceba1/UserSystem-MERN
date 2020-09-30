import { useState, useEffect } from 'react'

export default function useSubmit(submitFunc, id) {
  const [errors, setErrors] = useState();
  const [showWarning, setShowWarning] = useState();

  useEffect(() => {
    setShowWarning(errors !== undefined);
  }, [errors])

  return [errors, showWarning, setErrors, setShowWarning]
}