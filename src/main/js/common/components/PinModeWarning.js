import React from 'react'

const PinModeWarning = ({name, onCancel}) => (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", padding: 20}}>
        <div className={"panel panel-info"}>
            <div className={"panel-heading"}>
                <span style={{fontSize: 30}}>
                    <span>Przypnij <b>{name}</b> kliknięciem</span>
                    <span onClick={onCancel} style={{marginLeft: 20}}>
                        <i style={{cursor: "pointer"}} className={"pull-right glyphicon glyphicon-remove"}/>
                    </span>
                </span>
            </div>
        </div>

    </div>
);

export default PinModeWarning