import React from 'react'
import {connect} from 'react-redux'

import Panel from '../common/components/Panel'

import ActiveFireteam from './ActiveFireteam'
import FireteamTargetChooser from './FireteamTargetChooser'
import RescueFloorPlans from './RescueFloorPlans'

const RescueInsidePage = ({tags, artifacts, fireteams, floorPlans, selectedTargetTag, onSelectTargetTag, selectedTagOnMap, onSelectTagOnMap}) =>
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
                />
            </div>
            <div className="col-sm-9 colWithSmallerGutter">
                <RescueFloorPlans floorPlans={floorPlans} tags={tags} additionalMargin={183} selectedTag={selectedTagOnMap}/>
                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "-5px -5px 0 -5px"}}>
                    {fireteams.map(f => <div style={{flex: 1, margin: 5}} key={f.id}>
                            <Panel>
                                <ActiveFireteam fireteam={f} selectedTag={selectedTargetTag} onSelectTagOnMap={() => onSelectTagOnMap(tags.find(t => t.id == f.tagId))}/>
                            </Panel>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>;


class RescuePageContainer extends React.Component {
    state = {
        selectedTargetTag: null,
        selectedTagOnMap: null
    };

    onSelectTargetTag = (tag) => {
        this.setState({selectedTargetTag: tag});
    };

    onSelectTagOnMap = (tag) => {
        this.setState({selectedTagOnMap: tag});
    };

    render = () => (<RescueInsidePage
        {...this.props}
        onSelectTargetTag={this.onSelectTargetTag}
        selectedTargetTag={this.state.selectedTargetTag}
        onSelectTagOnMap={this.onSelectTagOnMap}
        selectedTagOnMap={this.state.selectedTagOnMap}
    />)
}

const mapStateToProps = (state) => ({
    fireteams: state.fireteams.items,
    tags: state.tags.items,
    artifacts: state.artifacts.items,
    floorPlans: state.floorPlans.items
});

export default connect(mapStateToProps)(RescuePageContainer)