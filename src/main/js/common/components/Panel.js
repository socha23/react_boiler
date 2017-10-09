import React from 'react'

const Panel = ({children}) => (
    <div className="panel panel-default">
        <div className="panel-body">
            {children}
        </div>
    </div>
);

const PanelWithTitle = ({title = "", children}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            <h3 className="panel-title">{title}</h3>
        </div>
        <div className="panel-body">
            {children}
        </div>
    </div>
);

module.exports = {
    Panel: Panel,
    PanelWithTitle: PanelWithTitle
};