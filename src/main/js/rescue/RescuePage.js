import React from 'react'
import {connect} from 'react-redux'

import Panel from '../common/components/Panel'
import HeightExpander from '../common/components/HeightExpander'


import ActiveFireteam from './ActiveFireteam'
import FireteamTargetChooser from './FireteamTargetChooser'

const RescuePage = ({tags, fireteams, selectedTargetTag, onSelectTargetTag}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-3 colWithSmallerGutter">
                <Panel>
                    <HeightExpander>
                        <FireteamTargetChooser tags={tags} selected={selectedTargetTag} onSelect={onSelectTargetTag}/>
                    </HeightExpander>
                </Panel>
            </div>
            <div className="col-sm-9 colWithSmallerGutter">
                <Panel>
                    Mapa
                </Panel>
                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "0 -5px"}}>
                    {fireteams.map(t => <div style={{flexGrow: 1, margin: 5}} key={t.id}>
                            <Panel>
                                <ActiveFireteam fireteam={t} selectedTag={selectedTargetTag}/>
                            </Panel>
                        </div>
                    )}
                </div>
                ;
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
        tags={this.props.tags}
        fireteams={this.props.fireteams}
        onSelectTargetTag={this.onSelectTargetTag}
        selectedTargetTag={this.state.selectedTag}
    />)
}

const mapStateToProps = (state) => ({
    fireteams: state.fireteams.items,
    tags: state.tags.items
});

export default connect(mapStateToProps)(RescuePageContainer)
