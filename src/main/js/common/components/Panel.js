import React from 'react'

const Panel = ({children, style={}, onClick=()=>{}, padding=10}) => (
    <div className="panel panel-default" style={{marginBottom: 0, ...style}} onClick={onClick}>
        <div className="panel-body" style={{padding: padding}}>
            {children}
        </div>
    </div>
);

export default Panel
