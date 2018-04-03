import React from 'react'
import {connect} from 'react-redux'

import {getFireteamTag, getTargetTag} from '../selectors'

import DistanceBetweenTags from '../../tags/DistanceBetweenTags'

export const TargetArrow = ({fireteamTag, targetTag, style={}}) => {
    if (!targetTag) {
        return <span/>
    }

    return <div style={{position: "absolute", width: "100%", top: style.top || 0, left: 0, zIndex: 2, textAlign: "center"}}>
        <div className="borderBottomPulseBlue" style={{
            borderBottomWidth: 80,
            borderBottomStyle: "solid",
            borderLeft: "100px solid transparent",
            borderRight: "100px solid transparent",
            width: 0,
            height: 0,
            margin: "auto",
            zIndex: 1
        }}/>
        <div className="pulseBlue" style={{width: 120, height: 40, margin: "auto", zIndex: 1}}/>
        <div style={{position: "absolute", top: 40, zIndex: 2, width: "100%", color: "white", fontSize: 60}}>
            <DistanceBetweenTags from={fireteamTag} to={targetTag} showUnit={false}/>
        </div>
    </div>;

    //if (targetTag.areaName == fireteamTag.areaName) {
};


export default connect((state, {fireteam}) => ({
    fireteamTag: getFireteamTag(state, fireteam),
    targetTag: getTargetTag(state, fireteam)
}))(TargetArrow)

