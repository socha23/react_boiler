import React from 'react'
import {connect} from 'react-redux'
import FireteamTargetChooser from './FireteamTargetChooser'
import FireteamChooser from './FireteamChooser'
import RescueFloorPlans from './RescueFloorPlans'
import FireteamOrders from './FireteamOrders'
import ShowDescriptionInPopup from '../museumDescription/ShowDescriptionInPopup'

import {getMuseumDescription} from "../museumDescription/selectors"
import {getSortedFireteams} from "../fireteams/selectors"

const LOWER_ROW_HEIGHT = 118;

const RescueInsidePage = ({
        tags, artifacts, fireteams, floorPlans,
        selectedTargetTag, onSelectTargetTag,
        selectedFireteam, onSelectFireteam,
        onMarkTagOnMap, tagMarkedOnMap,
        museumDescription

        }) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-3 colWithSmallerGutter">
                <FireteamTargetChooser
                    selected={selectedTargetTag}
                    onSelect={onSelectTargetTag}
                    additionalMargin={LOWER_ROW_HEIGHT}
                />
                <FireteamOrders fireteam={selectedFireteam} targetTag={selectedTargetTag}/>
            </div>
            <div className="col-sm-9 colWithSmallerGutter">
                <div style={{position: "absolute", right: 30, top: 10}}>
                    <ShowDescriptionInPopup value={museumDescription}/>
                </div>
                <RescueFloorPlans
                        additionalMargin={LOWER_ROW_HEIGHT}
                        markedTag={tagMarkedOnMap}
                        onSelect={onMarkTagOnMap}
                        selectedTarget={selectedTargetTag}
                        selectedFireteam={selectedFireteam}
                        />
                <FireteamChooser fireteams={fireteams} selected={selectedFireteam} onSelect={onSelectFireteam}/>
            </div>
        </div>
    </div>;


class RescuePageContainer extends React.Component {
    state = {
        targetTag: null,
        fireteam: null,
        tagOnMap: null
    };

    onSelectTargetTag = (tag) => {
        this.setState({
            targetTag: tag
        });
        this.markTagOnMap(tag);
    };

    onSelectFireteam = (fireteam) => {
        this.setState({
            fireteam: fireteam
        });
        this.markTagOnMap(this.props.tagsById[fireteam.tagId]);
    };

    markTagOnMap = (tag) => {
        this.setState({tagOnMap: null});
        setTimeout(() => {this.setState({tagOnMap: tag})});
    };

    onMarkTagOnMap = (tag) => {
        let fireteam = this.props.fireteams.find(f => f.tagId == tag.id);
        if (fireteam) {
            this.setState({fireteam: fireteam, tagOnMap: tag});
        } else {
            this.setState({targetTag: tag, tagOnMap: tag});
        }
    };

    render = () => (<RescueInsidePage
        {...this.props}
        onSelectTargetTag={this.onSelectTargetTag}
        selectedTargetTag={this.state.targetTag}
        onMarkTagOnMap={this.onMarkTagOnMap}
        tagMarkedOnMap={this.state.tagOnMap}
        onSelectFireteam={this.onSelectFireteam}
        selectedFireteam={this.state.fireteam ? this.props.fireteams.find(f => f.id == this.state.fireteam.id) : null}
    />)
}

const mapStateToProps = (state) => ({
    fireteams: getSortedFireteams(state),
    tags: state.tags.items,
    tagsById: state.tags.itemsById,
    artifacts: state.artifacts.items,
    floorPlans: state.floorPlans.items,
    museumDescription: getMuseumDescription(state)
});

export default connect(mapStateToProps)(RescuePageContainer)
