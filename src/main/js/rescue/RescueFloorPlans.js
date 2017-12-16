import React from 'react'
import PropTypes from 'prop-types'


import TabPanel from '../common/components/TabPanel'

import ZoomableFloorPlan from '../maps/ZoomableFloorPlan'

class RescueFloorPlans extends React.Component {
    static propTypes = {
        floorPlans: PropTypes.array.isRequired,
        additionalMargin: PropTypes.number
    };

    static defaultProps = {
        additionalMargin: 0
    };

    state = {
        currentTab: 0
    };

    onTabChange = (idx) => {
        this.setState({currentTab: idx});
    };

    render = () => {
        if (this.state.currentTab < this.props.floorPlans.length) {
            return <TabPanel tabs={this.props.floorPlans.map(fp => fp.name)} onTabChange={this.onTabChange}>
                <ZoomableFloorPlan map={this.props.floorPlans[this.state.currentTab]} additionalMargin={this.props.additionalMargin}/>
            </TabPanel>

        } else {
            return <span/>
        }
    };

}

export default RescueFloorPlans