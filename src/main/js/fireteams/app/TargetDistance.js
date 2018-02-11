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
    padding: 10,
    color: "white",
    fontSize: 50,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1
}}>
    <DistanceBetweenTags from={fireteamTag} to={targetTag}/>
</span>;

const DifferentFloorDistance = ({fireteamTag, targetTag}) => <div style={{
    backgroundColor: "black",
    padding: 10,
    color: "white",
    fontSize: 30

}}>
    <DistanceBetweenTags from={fireteamTag} to={targetTag}/>
    <span style={{marginLeft: 10}}>
        ({targetTag.areaName})
    </span>
</div>;
