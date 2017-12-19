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
        tagMarkedOnMap, onMarkTagOnMap,
        selectedFireteam, onSelectFireteam

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
                        tags={tags}
                        additionalMargin={LOWER_ROW_HEIGHT}
                        selectedTag={tagMarkedOnMap}
                        onSelect={onSelectTargetTag}
                        />
                <FireteamChooser fireteams={fireteams} onSelectTagOnMap={onMarkTagOnMap} selected={selectedFireteam} onSelect={onSelectFireteam}/>
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
            targetTag: tag,
            tagOnMap: tag
        });

        let fireteam = this.props.fireteams.find(f => f.tagId == tag.id);
        if (fireteam) {
            this.setState({fireteam: fireteam});
        }
    };

    onSelectFireteam = (fireteam) => {
        this.setState({
            fireteam: fireteam
        });

    };

    onMarkTagOnMap = (tag) => {
        this.setState({tagOnMap: tag});
    };

    render = () => (<RescueInsidePage
        {...this.props}
        onSelectTargetTag={this.onSelectTargetTag}
        selectedTargetTag={this.state.targetTag}
        onMarkTagOnMap={this.onMarkTagOnMap}
        tagMarkedOnMap={this.state.tagOnMap}
        onSelectFireteam={this.onSelectFireteam}
        selectedFireteam={this.state.fireteam}
    />)
}

const mapStateToProps = (state) => ({
    fireteams: state.fireteams.items,
    tags: state.tags.items,
    artifacts: state.artifacts.items,
    floorPlans: state.floorPlans.items
});

export default connect(mapStateToProps)(RescuePageContainer)
