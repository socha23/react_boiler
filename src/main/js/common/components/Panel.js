import React from 'react'

const Panel = ({children}) => (
    <div className="panel panel-default">
        <div className="panel-body">
            {children}
        </div>
    </div>
);

export default Panel
