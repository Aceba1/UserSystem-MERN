import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

function Warnings(props) {
  const show = (props.items !== undefined && props.items.length > 0);
  return (
    <div className={"Warning " + props.classStyle + 
        (props.showWarning ? " popup-rise" : " popup-fall")}>
      {
        typeof props.items === "string" ? ( <p>{props.items}</p> ) : (show ? 
          props.items.map( item => {
            return (
              <p key={item /*No duplicates, no problem*/ } className="WarningItem" /*style={styles.currentStyle.warningItem}*/>
                {item}
              </p>
            ); 
          }) :  null)
      }
      {show&&props.showHideButton?(
        <Button 
          text="Close"
          onClick={props.hideWarning}
          classStyle="warning-button"
        />) : null}
    </div>
  )
};

Warnings.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  showWarning: PropTypes.bool,
  showHideButton: PropTypes.bool,
  hideWarning: PropTypes.func,
  classStyle: PropTypes.string
};

export default Warnings

