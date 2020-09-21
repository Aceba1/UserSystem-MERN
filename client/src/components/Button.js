import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  return (
    <button onClick={props.onClick} className={"Button " + props.classStyle}> 
      { props.text }
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  classStyle: PropTypes.string
}

export default Button;