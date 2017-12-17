import React from 'react'
import PropTypes from 'prop-types'


import TabPanel from '../common/components/TabPanel'

import ZoomableFloorPlan from '../maps/ZoomableFloorPlan'

const RescueFloorPlans = ({floorPlans, additionalMargin = 0}) => <TabPanel tabs={
       floorPlans.map(fp => ({
            label: fp.name,
            body: <ZoomableFloorPlan map={fp} additionalMargin={additionalMargin}/>
       }))
    }/>;

export default RescueFloorPlans