import React from 'react'
import PropTypes from 'prop-types'


import TabPanel from '../common/components/TabPanel'

import ZoomableFloorPlan from '../maps/ZoomableFloorPlan'

class RescueFloorPlans extends React.Component {
    static propTypes = {
        floorPlans: PropTypes.array.isRequired
    };

    state = {
        currentTab: 0
    };

    // TODO obsługa zmiany taba!

    render = () => {
        if (this.state.currentTab < this.props.floorPlans.length) {
            return <TabPanel tabs={this.props.floorPlans.map(fp => fp.name)}>
                <ZoomableFloorPlan map={this.props.floorPlans[this.state.currentTab]}/>
            </TabPanel>

        } else {
            return <span/>
        }
    };

}

export default RescueFloorPlans