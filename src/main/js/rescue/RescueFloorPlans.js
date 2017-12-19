import React from 'react'
import PropTypes from 'prop-types'


import TabPanel, {STYLE_LG} from '../common/components/TabPanel'

import ZoomableFloorPlan from '../maps/ZoomableFloorPlan'
import {STYLE_ANIMATED_YELLOW, STYLE_ANIMATED_RED} from '../maps/Line'

const RescueFloorPlans = ({floorPlans, tags, selectedTag, onSelect, additionalMargin = 0}) => <TabPanel
    tabStyle={STYLE_LG}
    padding={0}
    activeTab={selectedTag ? floorPlans.findIndex(fp => fp.id == selectedTag.coordinateSystemId): null}
    tabs={
       floorPlans.map(fp => ({
            label: fp.name,
            body: <ZoomableFloorPlan
                map={fp}
                tags={tags.filter(t => t.coordinateSystemId == fp.id)}
                selectedTag={selectedTag}
                onClickTag={onSelect}
                additionalMargin={additionalMargin}
                lines={[
                    {
                        fromX: 40,
                        fromY: 40,
                        toX: 0,
                        toY: 0,
                        style: STYLE_ANIMATED_RED
                    }
                ]}

                />
       }))
    }/>;

export default RescueFloorPlans