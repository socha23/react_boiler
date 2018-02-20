import React from 'react'
import PropTypes from 'prop-types'

const VocIcon = ({value, className}) => {
    if (value) {

        return <span title={value.name} className={"vocIcon " + className}>
            {value.iconClass ? <i className={value.iconClass}/> : ""}
            {value.iconText ?
                <span className="badge"
                style={value.color ? {
                    "backgroundColor": value.color
                } : {}
                }>
                    {value.iconText}
                    </span>
                : ""}
        </span>
    } else {
        return <span/>
    }
};

VocIcon.propTypes = {
    value: PropTypes.object
};

export default VocIcon;
