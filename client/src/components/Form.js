import React, { useState, useEffect } from 'react'
import Input from './Input'
import Button from './Button'
import PropTypes from 'prop-types'
import Warnings from './Warnings'
import {get, set} from '../utils/localStorage'

import useSubmit from '../hooks/useSubmit'

/**
 * 
 * @param {{inputs: {name:string}[]}} props
 */
function Form(props) {
  // props.inputs.reduce((initial, input) => {
  //   initial[input.name] = ''
  //   return initial;
  // }, {});

  const [formValue, updateValues] = useState(() => {
    console.log('Restoring form');
    return get('form-' + props.id, {});
  });
  useEffect(() => {
    console.log('Storing form');

    set('form-' + props.id, formValue);
  }, [formValue, props.id]) // but the ID isn't supposed to change...

  const [errors, showWarning, setErrors, setShowWarning] = useSubmit(props.submitFunc, props.id);
  const hideWarning = () => {setShowWarning(false)};

  const handleSubmit = () => {
    props.submitFunc(formValue, setErrors, () => {
      localStorage.removeItem('form-' + props.id);
    })
  }

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
                save={inProps.save}
                value={formValue[inProps.name] ?? ''}
                //style={inProps.style}
                onChange={(event) => {
                  const input = event.target;
                  updateValues({...formValue, [input.name]: input.value})
                  hideWarning()
                }}
              />
            );
          })
        }
      </form>

      <Button
        text='Submit'
        onClick={handleSubmit}
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