import React from 'react'

const PanMapButton = ({onClick}) => <a style={{fontSize: 25}} onClick={e => {e.stopPropagation(); onClick(e)}}>
    <i className="glyphicon glyphicon-map-marker" />

</a>;

export default PanMapButton;