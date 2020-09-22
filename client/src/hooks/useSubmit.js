import { useState, useEffect } from 'react'

export default function useSubmit(submitFunc, id) {
  const [errors, setErrors] = useState();
  const [showWarning, setShowWarning] = useState();

  const setSubmit = () => {
    submitFunc(document.getElementById(id), setErrors)
  }

  useEffect(() => {
    setShowWarning(errors !== undefined);
  }, [errors])

  return [errors, showWarning, setSubmit, setShowWarning]
}