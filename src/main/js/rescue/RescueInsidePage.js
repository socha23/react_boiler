import React from 'react'
import {connect} from 'react-redux'

import ActiveFireteam from './ActiveFireteam'
import FireteamTargetChooser from './FireteamTargetChooser'
import FireteamChooser from './FireteamChooser'
import RescueFloorPlans from './RescueFloorPlans'
import FireteamOrders from './FireteamOrders'

const LOWER_ROW_HEIGHT = 118;

const RescueInsidePage = ({
        tags, artifacts, fireteams, floorPlans,
        selectedTargetTag, onSelectTargetTag,
        selectedFireteam, onSelectFireteam,
        onMarkTagOnMap, tagMarkedOnMap

        }) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-3 colWithSmallerGutter">
                <FireteamTargetChooser
                    tags={tags}
                    artifacts={artifacts}
                    fireteams={fireteams}
                    selected={selectedTargetTag}
                    onSelect={onSelectTargetTag}
                    additionalMargin={LOWER_ROW_HEIGHT}
                />
                <FireteamOrders fireteam={selectedFireteam} targetTag={selectedTargetTag}/>
            </div>
            <div className="col-sm-9 colWithSmallerGutter">
                <RescueFloorPlans
                        floorPlans={floorPlans}
                        fireteams={fireteams}
                        tags={tags}
                        additionalMargin={LOWER_ROW_HEIGHT}
                        selectedTag={tagMarkedOnMap}
                        onSelect={onMarkTagOnMap}
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
    fireteams: state.fireteams.items,
    tags: state.tags.items,
    tagsById: state.tags.itemsById,
    artifacts: state.artifacts.items,
    floorPlans: state.floorPlans.items
});

export default connect(mapStateToProps)(RescuePageContainer)
