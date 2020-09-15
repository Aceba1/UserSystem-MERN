import React from 'react'
import Input from './Input'
import Button from './Button'
import PropTypes from 'prop-types'
import Warnings from './Warnings';

const formStyle = {
  margin: 16
};
const titleStyle = { };
const buttonStyle = { };


class Form extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    inputs: PropTypes.array.isRequired,
    title: PropTypes.string,
    submitFunc: PropTypes.func,
    style: PropTypes.object,
    titleStyle: PropTypes.object,
    buttonStyle: PropTypes.object
  }

  constructor() {
    super()
    this.state = {
      errors: undefined
    }
  }

  submitClick() {
    this.props.submitFunc(document.getElementById(this.props.id), this.setErrors);
  }

  setErrors(errors) {
    this.setState({
      errors
    })
  }

  propChanged() {
    this.setState({errors: undefined})
  }

  render() {
    return (
      <div style={{...formStyle, ...this.props.style}}>
  
        <h2 style={{...titleStyle, ...this.props.titleStyle}}>
          {this.props.title}
        </h2>
        <Warnings
          items={this.state.errors}
        />
        <form id={this.props.id}>
          {
            this.props.inputs.map( inProps => {
              return (
                <Input
                  key={inProps.name}
                  name={inProps.name}
                  ph={inProps.ph}
                  type={inProps.type}
                  style={inProps.style}
                  id={inProps.id}
                  onChange={this.propChanged}
                />
              );
            })
          }
        </form>
  
        <Button
          text='Submit'
          style={{...buttonStyle, ...this.props.buttonStyle}}
          onClick={this.submitClick}
        />
      </div>
    )
  }
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

