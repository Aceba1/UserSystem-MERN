import React from 'react'
//import PropTypes from 'prop-types'
import styles from '../utils/styles'

function Warnings(props) {
    if (props.items !== undefined && props.items.length > 0)
        return (
            <div style={styles.currentStyle.warning}>
                {
                    props.items.map( item => {
                        return (
                            <p style={styles.currentStyle.warningItem}>
                                {item}
                            </p>
                        );
                    })
                }
            </div>
        )
    else 
        return null;
}

// Warnings.propTypes = {

// }

export default Warnings

