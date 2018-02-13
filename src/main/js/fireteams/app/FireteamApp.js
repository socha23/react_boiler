import React from 'react'
import {connect} from 'react-redux'


import Fullscreen from '../../common/components/Fullscreen'

import Map from './Map'
import TargetBar from './TargetBar'
import TargetDistance from './TargetDistance'
import ArtifactDetails from './ArtifactDetails'
import {distance} from '../../tags/DistanceBetweenTags'

import {getFireteamTag, getTargetTag} from '../selectors'


const MapMode = ({fireteam}) => {
    return <Fullscreen style={{display: "flex", flexDirection: "column"}}>
        <Map fireteam={fireteam}/>
        <TargetDistance fireteam={fireteam}/>
        <TargetBar fireteam={fireteam}/>
    </Fullscreen>
};

const ArtifactMode = ({fireteam}) => {
    return <Fullscreen style={{display: "flex", flexDirection: "column"}}>
        <TargetBar fireteam={fireteam}/>
        <div style={{flexGrow: 1}}>
            <ArtifactDetails fireteam={fireteam}/>
        </div>
    </Fullscreen>
};



function switchToArtifactMode(fireteamTag, targetTag, maxDistance) {
    return targetTag.type == "artifact"
        && fireteamTag.areaName == targetTag.areaName
        && distance(fireteamTag, targetTag) <= maxDistance
}

let ModeSwitcher = ({fireteam, fireteamTag, targetTag, distanceForArtifactMode}) =>
    switchToArtifactMode(fireteamTag, targetTag, distanceForArtifactMode)
        ? <ArtifactMode fireteam={fireteam}/>
        : <MapMode fireteam={fireteam}/>;

ModeSwitcher = connect((state, {fireteam}) => ({
    targetTag: getTargetTag(state, fireteam),
    fireteamTag: getFireteamTag(state, fireteam)
}))(ModeSwitcher);

const FireteamApp = ({fireteam}) => <ModeSwitcher fireteam={fireteam} distanceForArtifactMode={5}/>;


export default FireteamApp;
