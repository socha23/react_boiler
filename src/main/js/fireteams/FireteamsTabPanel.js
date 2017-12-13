import React from 'react'
import {PropTypes} from 'prop-types'

import TabPanel from '../common/components/TabPanel'

import FireteamInfo from './FireteamInfo'

class FireteamsTabPanel extends React.Component {

    state = {
        currentTab: 0
    };

    static propTypes = {
        fireteams: PropTypes.array
    };

    static defaultProps = {
        fireteams: []
    };

    onTabChange = (idx) => {
        this.setState({currentTab: idx})
    };

    render = () => <TabPanel
        tabs={this.props.fireteams.map(t => t.name)}
        onTabChange={this.onTabChange}
    >
        { this.state.currentTab < this.props.fireteams.length ?
            <FireteamInfo fireteam={this.props.fireteams[this.state.currentTab]}/>
            : <div></div>
        }
    </TabPanel>
}

export default FireteamsTabPanel