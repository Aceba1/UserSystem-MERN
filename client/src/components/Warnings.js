import React from 'react'
import PropTypes from 'prop-types'
import styles from '../utils/styles'

function Warnings(props) {
    if (props.items.length > 0)
        return (
            <div style={styles.currentStyle.warning}>
                {
                    this.props.inputs.map( item => {
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
        return;
}

Warnings.propTypes = {

}

export default Warnings

