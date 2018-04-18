import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


import Fullscreen from '../../common/components/Fullscreen'

import Map from './Map'
import TargetArrow from './TargetArrow'
import WrongFloorWarning from './WrongFloorWarning'
import TargetBar from './TargetBar'
import ArtifactDetails from './ArtifactDetails'
import ArtifactImage from './ArtifactImage'
import {distance} from '../../tags/DistanceBetweenTags'
import {IfNothingReceived} from "../../common/crud/nothingReceived";
import {getFireteamTag, getTargetTag} from '../selectors'
import {findArtifactByTagId} from "../../artifacts/selectors";


const NothingReceivedWarning = () => <IfNothingReceived secondsWithoutReceive={5}>
    <div style={{
        color: "white",
        backgroundColor: "#d9534f",
        textAlign: "center",
        fontSize: 16,
        padding: 10,
        zIndex: 1
    }} onClick={e => {window.location.reload()}}>
        BRAK POŁĄCZENIA Z SERWEREM
    </div>
</IfNothingReceived>;

class MapMode extends React.Component {

    static props = {
        fireteam: PropTypes.object.isRequired,
        zoomLevels: PropTypes.array
    };

    static defaultProps = {
        zoomLevels: [1, 0.33]
    };

    state = {
        targetShown: true,
        zoomIdx: 0
    };

    onTargetShown = (shown) => {
        this.setState({targetShown: shown});
    };

    render = () => {
        return <Fullscreen style={{position: "relative", display: "flex", flexDirection: "column"}}
                           onClick={this.toggleZoomLevel}>
            <NothingReceivedWarning/>
            <Map fireteam={this.props.fireteam} zoom={this.zoom()} onTargetShown={this.onTargetShown}/>
            {this.state.targetShown ? <span/> : <TargetArrow fireteam={this.props.fireteam} style={{top: 20}}/>}
            <WrongFloorWarning fireteam={this.props.fireteam} style={{top: 140}}/>
            <TargetBar fireteam={this.props.fireteam}/>
        </Fullscreen>
    };

    toggleZoomLevel = () => {
        this.setState({zoomIdx: (this.state.zoomIdx + 1) % this.props.zoomLevels.length})
    };

    zoom = () => (this.props.zoomLevels[this.state.zoomIdx]);
}

let ArtifactMode = ({fireteam, artifact}) => {
    return <Fullscreen
        style={{backgroundColor: "black", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <NothingReceivedWarning/>
        <TargetBar fireteam={fireteam}/>
        <ArtifactImage artifact={artifact}/>
        <ArtifactDetails artifact={artifact}/>
    </Fullscreen>
};

ArtifactMode = connect((state, {fireteam}) => ({
    artifact: findArtifactByTagId(state, fireteam.targetTagId)
}))(ArtifactMode);


export function switchToArtifactMode(fireteamTag, targetTag, maxDistance) {
    if (!targetTag) {
        return false;
    }
    return targetTag.type == "artifact"
        && fireteamTag.areaName == targetTag.areaName
        && distance(fireteamTag, targetTag) <= maxDistance
}

let ModeSwitcher = ({fireteam, fireteamTag, targetTag, distanceForArtifactMode}) =>
    fireteamTag ? (
        switchToArtifactMode(fireteamTag, targetTag, distanceForArtifactMode)
            ? <ArtifactMode fireteam={fireteam}/>
            : <MapMode fireteam={fireteam}/>) : <span/>;

ModeSwitcher = connect((state, {fireteam}) => ({
    targetTag: getTargetTag(state, fireteam),
    fireteamTag: getFireteamTag(state, fireteam)
}))(ModeSwitcher);

const FireteamApp = ({fireteam}) => <ModeSwitcher fireteam={fireteam} distanceForArtifactMode={0.75}/>;


export default FireteamApp;
