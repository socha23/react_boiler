import React from 'react'

const PanMapButton = ({onClick}) => <a style={{fontSize: 25}} onClick={onClick}>
    <i className="glyphicon glyphicon-map-marker" />

</a>;

export default PanMapButton;