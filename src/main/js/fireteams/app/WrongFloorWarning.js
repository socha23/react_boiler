import React from 'react'
import {connect} from 'react-redux'

import {getFireteamTag, getTargetTag} from '../selectors'

export const WrongFloorWarning = ({fireteamTag, targetTag, style={}}) => {
    if (!targetTag || targetTag.areaName == fireteamTag.areaName) {
        return <span/>
    }

    return <div style={{position: "absolute", width: "100%", top: style.top || 0, left: 0, zIndex: 2, textAlign: "center"}}>
        <div className="colorPulseBlue" style={{fontSize: 40, fontWeight: "bold"}}>
            Cel na poziomie:
        </div>
        <div className="colorPulseBlue" style={{fontSize: 50, fontWeight: "bold"}}>
            {targetTag.areaName}
        </div>
    </div>;
};


export default connect((state, {fireteam}) => ({
    fireteamTag: getFireteamTag(state, fireteam),
    targetTag: getTargetTag(state, fireteam)
}))(WrongFloorWarning)

