import React from 'react'
import styles from '../utils/styles'

export default function Button(props) {
  return (
    <button onClick={props.onClick} style={{...styles.currentStyle.button, ...props.style}} >
      { props.text }
    </button>
  )
}