import React from 'react'

const Panel = ({children, padding=10}) => (
    <div className="panel panel-default">
        <div className="panel-body" style={{padding: padding}}>
            {children}
        </div>
    </div>
);

export default Panel
