import React from 'react'
import {connect} from 'react-redux'

import Panel from '../common/components/Panel'

import FireteamsTabPanel from '../fireteams/FireteamsTabPanel'
import RescueTargetsList from './RescueTargetsList'

const RescuePage = ({tags, fireteams, selectedTarget, onSelectTarget}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-3 colWithSmallerGutter">
                <Panel>
                    <RescueTargetsList tags={tags} selected={selectedTarget} onSelect={onSelectTarget}/>
                </Panel>
            </div>
            <div className="col-sm-9 colWithSmallerGutter">
                <Panel>
                    Mapa
                </Panel>
                <FireteamsTabPanel fireteams={fireteams}/>
            </div>
        </div>
    </div>;


class RescuePageContainer extends React.Component {
    state = {
        selectedTag: {}
    };

    onSelectTarget = (tag) => {
        this.setState({selectedTag: tag});
    };

    render = () => (<RescuePage
        tags={this.props.tags}
        fireteams={this.props.fireteams}
        onSelectTarget={this.onSelectTarget}
        selectedTarget={this.state.selectedTag}
        />)
}

const mapStateToProps = (state) => ({
    fireteams: state.fireteams.items,
    tags: state.tags.items
});

export default connect(mapStateToProps)(RescuePageContainer)
