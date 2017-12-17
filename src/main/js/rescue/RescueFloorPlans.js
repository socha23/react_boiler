import React from 'react'
import PropTypes from 'prop-types'


import TabPanel from '../common/components/TabPanel'

import ZoomableFloorPlan from '../maps/ZoomableFloorPlan'

const RescueFloorPlans = ({floorPlans, tags, additionalMargin = 0}) => <TabPanel
    padding={0}
    tabs={
       floorPlans.map(fp => ({
            label: fp.name,
            body: <ZoomableFloorPlan
                map={fp}
                tags={tags.filter(t => t.coordinateSystemId == fp.id)}
                additionalMargin={additionalMargin}/>
       }))
    }/>;

export default RescueFloorPlans