import React from 'react'
import Input from './Input'
import Button from './Button'
import PropTypes from 'prop-types'
import Warnings from './Warnings';

import useSubmit from '../hooks/useSubmit'

function Form(props) {
  const [errors, showWarning, setSubmit, setShowWarning] = useSubmit(props.submitFunc, props.id);
  const hideWarning = () => {setShowWarning(false)};

  return (
    <div className={"Form"}>
      <h2>
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
                //style={inProps.style}
                id={inProps.id}
                onChange={hideWarning}
              />
            );
          })
        }
      </form>

      <Button
        text='Submit'
        onClick={setSubmit}
      />
      <Warnings
        items={errors}
        showWarning={showWarning}
      />
    </div>
  )
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      ph: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      id: PropTypes.string
    })).isRequired,
  title: PropTypes.string,
  submitFunc: PropTypes.func.isRequired,
}

export default Form