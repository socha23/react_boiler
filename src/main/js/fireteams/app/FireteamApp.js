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


class ModeSwitcher extends React.Component {
    static defaultProps = {
        distanceForArtifactMode: 1,
        distanceForMapMode: 2
    };

    state = {artifactMode: false};

    componentWillReceiveProps = (props) => {
        if (!props.targetTag || props.targetTag.type != "artifact" || props.fireteamTag.areaName != props.targetTag.areaName) {
            console.log("EARLY EXIT");
            this.setState({artifactMode: false})
        }
        const myDistance = distance(props.fireteamTag, props.targetTag);
        if (this.state.artifactMode && myDistance > props.distanceForMapMode) {
            this.setState({artifactMode: false})
        }
        if (!this.state.artifactMode && myDistance < props.distanceForArtifactMode) {
            this.setState({artifactMode: true})
        }
    };

    render = () => {
        if (!this.props.fireteamTag) {
            return <span/>
        }
        if (this.state.artifactMode) {
            return <ArtifactMode fireteam={this.props.fireteam}/>
        } else {
            return <MapMode fireteam={this.props.fireteam}/>
        }
    }
}

ModeSwitcher = connect((state, {fireteam}) => ({
    targetTag: getTargetTag(state, fireteam),
    fireteamTag: getFireteamTag(state, fireteam)
}))(ModeSwitcher);

const FireteamApp = ({fireteam}) => <ModeSwitcher fireteam={fireteam} distanceForArtifactMode={1.2} distanceForMapMode={2.4}/>;


export default FireteamApp;
