import React from 'react'

const PanelWithTitle = ({title = "", children}) => (
    <div className="panel panel-default">
        <div className="panel-heading" style={{backgroundColor: "white"}}>
            <span className="panel-title">{title}</span>
        </div>
        <div className="panel-body">
            {children}
        </div>
    </div>
);

export default PanelWithTitle