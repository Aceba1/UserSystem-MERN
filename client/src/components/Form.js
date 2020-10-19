import React, { useState, useEffect } from 'react'
import Input from './Input'
import Button from './Button'
import PropTypes from 'prop-types'
//import Warnings from './Warnings'
import {get, set} from '../utils/localStorage'
import { getError } from '../utils/userRequest';
import useSubmit from '../hooks/useSubmit'
import Axios from 'axios'
import Text from './Text'

/**
 * 
 * @param {{inputs: {name:string}[]}} props
 */
function Form(props) {
  // props.inputs.reduce((initial, input) => {
  //   initial[input.name] = ''
  //   return initial;
  // }, {});
  const [requestMessage, setReqMes] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [formValue, updateValues] = useState(() => {
    console.log('Restoring form');
    return get('form-' + props.id, {});
  });
  useEffect(() => {
    set('form-' + props.id, formValue);
  }, [formValue, props.id]) // but the ID isn't supposed to change...

  //const [errors, showWarning, setErrors, setShowWarning] = useSubmit(props.submitFunc, props.id);
  //const hideWarning = () => {setShowWarning(false)};

  const handleSubmit = () => {
    const {endpoint, method, validation} = props.request;

    // Axios.create({
    //   method: method,
    //   endpoint: endpoint,
    // })
      //props.submitFunc(formValue, setErrors, () => {
      const errs = validation(formValue);
      if (errs) {
        setFormErrors(errs);
        console.log(errs);
      } else {
        console.log('Passed!');
        localStorage.removeItem('form-' + props.id);
        Axios({
          method: method,
          url: endpoint,
          data: formValue
        })
        .then( res => {
          if (res.status === 201 ||res.status === 200) {
            // Do something when login succeeds
            // Use cookie utility, set expires time for cookie that lasts as long as the JWT
            localStorage.setItem("token", res.data.token); // Move to Cookies!
            localStorage.setItem("user", JSON.stringify(res.data.user)); // Not stringified!
            console.log(res.data);
            window.location.pathname = '/';
            updateValues({});
          }
        })
        .catch( err => {
          if (err) {
            if (err.response) {
              console.log(err.response.data)
              setReqMes(getError(err.response.data));
            }
            else {
              console.log(err); 
              setReqMes(getError(err.message));
            }
          }
        });
        setFormErrors({});
      }
    //})
  }

  return (
    <div className={"Form"}>
      <h2>
        {props.title}
      </h2>
      <Text className='warning-label' value={requestMessage}/>
      <form id={props.id}>
        {
          props.inputs.map( inProps => {
            return ( // Could add unique errors to each input, as a <div> here
              <div key={inProps.name+'Div'}>
                <Text className='warning-label'
                  key={inProps.name+'Error'}
                  value={formErrors[inProps.name] ?? ''}/>
                <Input
                  key={inProps.name+'Input'}
                  name={inProps.name}
                  ph={inProps.ph}
                  type={inProps.type}
                  save={inProps.save}
                  value={formValue[inProps.name] ?? ''}
                  //style={inProps.style}
                  onChange={(event) => {
                    const input = event.target;
                    updateValues({...formValue, [input.name]: input.value})
                    //hideWarning()
                  }}
                />
              </div>
            );
          })
        }
      </form>

      <Button
        text='Submit'
        onClick={handleSubmit}
      />
      {/* <Warnings
        items={errors}
        showWarning={showWarning}
      /> */}
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
  request: PropTypes.object,
}

export default Form