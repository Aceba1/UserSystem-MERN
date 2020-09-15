import React from 'react'
import Input from './Input'
import Button from './Button'
import PropTypes from 'prop-types'

const formStyle = {
  margin: 16
};
const titleStyle = { };
const buttonStyle = { };

function Form(props) {
  
  const btn_onClick = () => {
    props.submitFunc(document.getElementById(props.id))
  }

  return (
    <div style={{...formStyle, ...props.style}}>

      <h2 style={{...titleStyle, ...props.titleStyle}}>
        {props.title}
      </h2>

      <form id={props.id}>
        {
          props.inputs.map( inProps => {
            return (
              <Input
                key={inProps.name}
                name={inProps.name}
                ph={inProps.ph}
                type={inProps.type}
                style={inProps.style}
                id={inProps.id}
                onChange={inProps.onChange}
              />
            );
          })
        }
      </form>

      <Button
        text='Submit'
        style={{...buttonStyle, ...props.buttonStyle}}
        onClick={btn_onClick}
      />
    </div>
  )
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
  inputs: PropTypes.array.isRequired,
  title: PropTypes.string,
  submitFunc: PropTypes.func,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  buttonStyle: PropTypes.object
}
// Form.propTypes.inputs.arguments = {
//     name: PropTypes.string,
//     ph: PropTypes.string,
//     type: PropTypes.string,
//     style: PropTypes.string,
//     id: PropTypes.string,
//     onChange: PropTypes.func
// }

export default Form

