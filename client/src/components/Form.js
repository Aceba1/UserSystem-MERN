import React from 'react'
import Input from './Input'
import Button from './Button'
import PropTypes from 'prop-types'
import Warnings from './Warnings';

class Form extends React.Component {

  static propTypes = {
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
    style: PropTypes.object,
    titleStyle: PropTypes.object,
    buttonStyle: PropTypes.object
  }

  constructor() {
    super()
    this.state = {
      errors: undefined,
      showWarning: false
    }
    this.propChanged = this.propChanged.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.setErrors = this.setErrors.bind(this);
  }

  submitClick() {
    this.props.submitFunc(document.getElementById(this.props.id), this.setErrors);
  }

  setErrors(errors) {
    if (errors === undefined) {
      this.setState({
        showWarning: false
      });
    } else {
      this.setState({
        showWarning: true,
        errors: errors
      })
    }
  }

  propChanged() {
    this.setErrors(undefined);
  }

  render() {
    return (
      <div className={"Form"} /*style={{...formStyle, ...this.props.style}}*/>
  
        <h2>
          {this.props.title}
        </h2>
        <form id={this.props.id}>
          {
            this.props.inputs.map( inProps => {
              return (
                <Input
                  key={inProps.name}
                  name={inProps.name}
                  ph={inProps.ph}
                  type={inProps.type}
                  //style={inProps.style}
                  id={inProps.id}
                  onChange={this.propChanged}
                />
              );
            })
          }
        </form>
  
        <Button
          text='Submit'
          //style={{...buttonStyle, ...this.props.buttonStyle}}
          onClick={this.submitClick}
        />
        <Warnings
          items={this.state.errors}
          showWarning={this.state.showWarning}
        />
      </div>
    )
  }
}

export default Form

