import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import TabPanel, {STYLE_LG} from '../common/components/TabPanel'

import ZoomableFloorPlan from '../maps/ZoomableFloorPlan'
import {STYLE_ANIMATED_YELLOW, STYLE_ANIMATED_RED} from '../maps/Line'

const RescueFloorPlans = ({floorPlans, fireteams, tags, selectedTag, onSelect, tagsById, additionalMargin = 0}) => <TabPanel
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
                lines={getTargetLines(fp.id, fireteams, tagsById)}
                />
       }))
    }/>;

function getTargetLines(coordinateSystemId, fireteams, tagsById) {
    return fireteams
        .filter(f => f.tagId && tagsById[f.tagId] && tagsById[f.tagId].coordinateSystemId == coordinateSystemId)
        .filter(f => f.targetTagId && tagsById[f.targetTagId] && tagsById[f.targetTagId].coordinateSystemId == coordinateSystemId)
        .map(f => {
                let from = tagsById[f.tagId].position;
                let to = tagsById[f.targetTagId].position;
                return {
                    fromX: from.x,
                    fromY: from.y,
                    toX: to.x,
                    toY: to.y,
                    style: STYLE_ANIMATED_YELLOW
                }
            });
}

const mapStateToProps = (state) => ({
    tagsById: state.tags.itemsById
});

export default connect(mapStateToProps)(RescueFloorPlans)
