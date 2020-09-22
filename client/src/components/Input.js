import React from 'react'
import PropTypes from 'prop-types'

function Input(props) {
  return (
    <input
    className="Input"
    placeholder={props.ph}
    type={props.type}
    onChange={props.onChange}
    name={props.name}
    id={props.id}
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