import React from 'react'
import PropTypes from 'prop-types'

const VocIcon = ({value}) => {
    if (value) {
        return <div className="vocIcon">
            {value.iconClass ? <i className={value.iconClass}/> : ""}
            {value.iconText ? <span className="badge">{value.iconText}</span> : ""}
        </div>
    } else {
        return <span/>
    }
};

VocIcon.propTypes = {
    value: PropTypes.object
};

export default VocIcon;
