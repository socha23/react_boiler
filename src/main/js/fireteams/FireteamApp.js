import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {getFireteamTag, getTargetTag, getFireteamFloorPlan} from './selectors'
import Fullscreen from '../common/components/Fullscreen'
import FireteamMap from './FireteamMap'

export class FireteamAppComponent extends React.Component {

    static propTypes = {
        fireteam: PropTypes.object.isRequired,
        fireteamTag: PropTypes.object.isRequired,
        targetTag: PropTypes.object,
        floorPlan: PropTypes.object
    };

    static defaultProps = {
        floorPlan: {},
        targetTag: {}
    };

    render = () => {
        return <Fullscreen>
            <FireteamMap
                fireteamTag={this.props.fireteamTag}
                targetTag={this.props.targetTag}
                floorPlan={this.props.floorPlan}/>
        </Fullscreen>
    }
}

export default connect((state, {fireteam}) => ({
    fireteamTag: getFireteamTag(state, fireteam),
    targetTag: getTargetTag(state, fireteam),
    floorPlan: getFireteamFloorPlan(state, fireteam)
}))(FireteamAppComponent)