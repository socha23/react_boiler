import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


import Fullscreen from '../../common/components/Fullscreen'

import Map from './Map'
import TargetBar from './TargetBar'
import TargetDistance from './TargetDistance'
import ArtifactDetails from './ArtifactDetails'
import ArtifactImage from './ArtifactImage'
import {distance} from '../../tags/DistanceBetweenTags'

import {getFireteamTag, getTargetTag} from '../selectors'
import {findArtifactByTagId} from "../../artifacts/selectors";


class MapMode extends React.Component {

    static props = {
        fireteam: PropTypes.object.isRequired,
        zoomLevels: PropTypes.array
    };

    static defaultProps = {
        zoomLevels: [1, 0.33]
    };

    state = {
        zoomIdx: 0
    };

    render = () => {
        return <Fullscreen style={{display: "flex", flexDirection: "column"}} onClick={this.toggleZoomLevel}>
            <Map fireteam={this.props.fireteam} zoom={this.zoom()}/>
                <TargetDistance fireteam={this.props.fireteam}/>
                <TargetBar fireteam={this.props.fireteam}/>
        </Fullscreen>
    };

    toggleZoomLevel = () => {
        this.setState({zoomIdx: (this.state.zoomIdx + 1) % this.props.zoomLevels.length})
    };

    zoom = () => (this.props.zoomLevels[this.state.zoomIdx]);
}

let ArtifactMode = ({fireteam, artifact}) => {
    return <Fullscreen style={{backgroundColor: "black", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <TargetBar fireteam={fireteam}/>
        <ArtifactImage artifact={artifact}/>
        <ArtifactDetails artifact={artifact}/>
    </Fullscreen>
};

ArtifactMode = connect((state, {fireteam}) => ({
    artifact: findArtifactByTagId(state, fireteam.targetTagId)
}))(ArtifactMode);




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

const FireteamApp = ({fireteam}) => <ModeSwitcher fireteam={fireteam} distanceForArtifactMode={0.75}/>;


export default FireteamApp;
