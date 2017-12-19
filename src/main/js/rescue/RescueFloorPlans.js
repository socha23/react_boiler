import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import TabPanel, {STYLE_LG} from '../common/components/TabPanel'

import ZoomableFloorPlan from '../maps/ZoomableFloorPlan'
import {STYLE_ANIMATED_YELLOW, STYLE_ANIMATED_RED} from '../maps/Line'

class RescueFloorPlans extends React.Component {
    static defaultProps = {
        floorPlans: [],
        fireteams: [],
        tags: [],
        selectedTag: null,
        onSelect: () => {
        },
        tagsById: {},
        additionalMargin: 0
    };

    state = {
        lastSelected: {},
        activeTab: 0
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.selectedTag && nextProps.selectedTag.id != this.state.lastSelected.id) {
            this.setState({
                lastSelected: nextProps.selectedTag,
                activeTab: this.props.floorPlans.findIndex(fp => fp.id == nextProps.selectedTag.coordinateSystemId)
            });
        } else if (!nextProps.selectedTag) {
            this.setState({
                lastSelected: {}
            });

        }
    };

    onTabChange = (i) => {this.setState({activeTab: i})};

    render = () =>
            <TabPanel
                    tabStyle={STYLE_LG}
                    padding={0}
                    activeTab={this.state.activeTab}
                    onTabChange={this.onTabChange}
                    tabs={
               this.props.floorPlans.map(fp => ({
                    label: fp.name,
                    body: <ZoomableFloorPlan
                        map={fp}
                        tags={this.props.tags.filter(t => t.coordinateSystemId == fp.id)}
                        selectedTag={this.props.selectedTag}
                        onClickTag={this.props.onSelect}
                        additionalMargin={this.props.additionalMargin}
                        lines={getTargetLines(fp.id, this.props.fireteams, this.props.tagsById)}
                        />
               }))
            }/>
}

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
