import React from 'react'
import {connect} from 'react-redux'

import {getFireteamTag, getTargetTag} from '../selectors'

import DistanceBetweenTags from '../../tags/DistanceBetweenTags'

export const DistanceComponent = ({fireteamTag, targetTag}) => {
    if (targetTag.areaName == fireteamTag.areaName) {
        return <SameFloorDistance fireteamTag={fireteamTag} targetTag={targetTag}/>

    } else {
        return <DifferentFloorDistance fireteamTag={fireteamTag} targetTag={targetTag}/>
    }
};


export default connect((state, {fireteam}) => ({
    fireteamTag: getFireteamTag(state, fireteam),
    targetTag: getTargetTag(state, fireteam)
}))(DistanceComponent)


const SameFloorDistance = ({fireteamTag, targetTag}) => <span style={{
    backgroundColor: "black",
    color: "white",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    padding: "5px 20px 20px 5px",
    fontSize: 90,
    lineHeight: 1,
    borderBottomRightRadius: 15
}}>
    <DistanceBetweenTags from={fireteamTag} to={targetTag}/>
</span>;

const DifferentFloorDistance = ({fireteamTag, targetTag}) => <div style={{
    width: "100%",
    backgroundColor: "black",
    color: "white",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    fontSize: 46,
    lineHeight: 1,
    paddingBottom: 10

}}>
    <DistanceBetweenTags from={fireteamTag} to={targetTag}/>
    <span style={{marginLeft: 10}}>  
        - {targetTag.areaName}
    </span>
</div>;
