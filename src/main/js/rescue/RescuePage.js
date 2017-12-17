import React from 'react'
import {connect} from 'react-redux'

import Panel from '../common/components/Panel'

import ActiveFireteam from './ActiveFireteam'
import FireteamTargetChooser from './FireteamTargetChooser'
import RescueFloorPlans from './RescueFloorPlans'

const RescuePage = ({tags, artifacts, fireteams, floorPlans, selectedTargetTag, onSelectTargetTag}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-3 colWithSmallerGutter">
                <FireteamTargetChooser
                    tags={tags}
                    artifacts={artifacts}
                    fireteams={fireteams}
                    selected={selectedTargetTag} onSelect={onSelectTargetTag}/>
            </div>
            <div className="col-sm-9 colWithSmallerGutter">
                <RescueFloorPlans floorPlans={floorPlans} additionalMargin={183}/>
                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "-5px -5px 0 -5px"}}>
                    {fireteams.map(t => <div style={{flex: 1, margin: 5}} key={t.id}>
                            <Panel>
                                <ActiveFireteam fireteam={t} selectedTag={selectedTargetTag}/>
                            </Panel>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>;


class RescuePageContainer extends React.Component {
    state = {
        selectedTag: null
    };

    onSelectTargetTag = (tag) => {
        this.setState({selectedTag: tag});
    };

    render = () => (<RescuePage
        {...this.props}
        onSelectTargetTag={this.onSelectTargetTag}
        selectedTargetTag={this.state.selectedTag}
    />)
}

const mapStateToProps = (state) => ({
    fireteams: state.fireteams.items,
    tags: state.tags.items,
    artifacts: state.artifacts.items,
    floorPlans: state.floorPlans.items
});

export default connect(mapStateToProps)(RescuePageContainer)
