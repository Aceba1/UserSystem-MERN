import React from 'react'
import styles from '../utils/styles'

export default function Button(props) {
  return (
    <button onClick={props.onClick} className="Button" /*{"Button " + styles.currentStyle} >*/> 
      { props.text }
    </button>
  )
}