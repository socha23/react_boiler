import React from 'react'
import {connect} from 'react-redux'

import ActiveFireteam from './ActiveFireteam'
import FireteamTargetChooser from './FireteamTargetChooser'
import FireteamChooser from './FireteamChooser'
import RescueFloorPlans from './RescueFloorPlans'
import FireteamOrders from './FireteamOrders'

const LOWER_ROW_HEIGHT = 183;

const RescueInsidePage = ({
        tags, artifacts, fireteams, floorPlans,
        selectedTargetTag, onSelectTargetTag,
        selectedTagOnMap, onSelectTagOnMap,
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
                    onSelectTagOnMap={onSelectTagOnMap}
                    additionalMargin={LOWER_ROW_HEIGHT}
                />
                <FireteamOrders fireteam={selectedFireteam} targetTag={selectedTargetTag}/>
            </div>
            <div className="col-sm-9 colWithSmallerGutter">
                <RescueFloorPlans floorPlans={floorPlans} tags={tags} additionalMargin={LOWER_ROW_HEIGHT} selectedTag={selectedTagOnMap}/>
                <FireteamChooser fireteams={fireteams} onSelectTagOnMap={onSelectTagOnMap} selected={selectedFireteam} onSelect={onSelectFireteam}/>
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

    };

    onSelectFireteam = (fireteam) => {
        this.setState({
            fireteam: fireteam
        });

    };

    onSelectTagOnMap = (tag) => {
        this.setState({tagOnMap: tag});
    };

    render = () => (<RescueInsidePage
        {...this.props}
        onSelectTargetTag={this.onSelectTargetTag}
        selectedTargetTag={this.state.targetTag}
        onSelectTagOnMap={this.onSelectTagOnMap}
        selectedTagOnMap={this.state.tagOnMap}
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
