import React from 'react'
import PropTypes from 'prop-types'
//import styles from '../utils/styles'

function Warnings(props) {
    const show = (props.items !== undefined && props.items.length > 0);

    return (
        <div className={"Warning " + (props.showWarning ? "popup-rise" : "popup-fall")}/*style={styles.currentStyle.warning}*/>
            {
                show ? 
                    props.items.map( item => {
                        return (
                            <p key={item /*No duplicates, no problem*/ } className="WarningItem" /*style={styles.currentStyle.warningItem}*/>
                                {item}
                            </p>
                        ); 
                    }) :  null
            }
        </div>
    )
};

Warnings.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    showWarning: PropTypes.bool
};

export default Warnings

