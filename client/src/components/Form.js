import React, {useState, useEffect} from 'react'
import Input from './Input'
import Button from './Button'
import PropTypes from 'prop-types'
import Warnings from './Warnings';

// Use React Hooks instead of messy Components
function useSubmit(submitFunc, id) {
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

function Form(props) {
  const [errors, showWarning, setSubmit, setShowWarning] = useSubmit(props.submitFunc, props.id);
  const hideWarning = () => {setShowWarning(false)};

  return (
    <div className={"Form"} /*style={{...formStyle, ...this.props.style}}*/>
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
        //style={{...buttonStyle, ...this.props.buttonStyle}}
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
  // style: PropTypes.object,
  // titleStyle: PropTypes.object,
  // buttonStyle: PropTypes.object
}

export default Form

