import React from 'react'
import PropTypes from 'prop-types'
//import styles from '../utils/styles'

function Input(props) {
  return (
    <input
    className="Input" /*{"Input "+ styles.currentStyle}*/
    placeholder={props.ph}
    type={props.type}
    onChange={props.onChange}
    name={props.name}
    id={props.id}
    //style={{...styles.currentStyle.input, ...props.style}}
    // placeholder, type, onChange, name, id

    />
  )
}

Input.propTypes = {
  ph: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  style: PropTypes.object
}

export default Input;

