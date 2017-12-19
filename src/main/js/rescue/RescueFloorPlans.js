import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import TabPanel, {STYLE_LG} from '../common/components/TabPanel'

import ZoomableFloorPlan from '../maps/ZoomableFloorPlan'
import {STYLE_ANIMATED_YELLOW, STYLE_ANIMATED_RED, STYLE_ANIMATED_GREEN} from '../maps/Line'

class RescueFloorPlans extends React.Component {
    static defaultProps = {
        floorPlans: [],
        fireteams: [],
        tags: [],
        markedTag: null,
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
        if (nextProps.markedTag && nextProps.markedTag.id != this.state.lastSelected.id) {
            this.setState({
                lastSelected: nextProps.markedTag,
                activeTab: this.props.floorPlans.findIndex(fp => fp.id == nextProps.markedTag.coordinateSystemId)
            });
        } else if (!nextProps.markedTag) {
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
                        selectedTag={this.props.markedTag}
                        onClickTag={this.props.onSelect}
                        additionalMargin={this.props.additionalMargin}
                        lines={getTargetLines(fp.id, this.props.fireteams, this.props.tagsById)}
                        />
               }))
            }/>
}

function getTargetLines(coordinateSystemId, fireteams, tagsById = {}) {
    return fireteams
            .filter(f => teamAndTargetOnMyFloor(f, tagsById, coordinateSystemId))
            .map(f => targetLine(f, tagsById, STYLE_ANIMATED_GREEN));
}

function teamAndTargetOnMyFloor(fireteam, tagsById, coordinateSystemId) {
    return allTagsInCoordinateSystem(coordinateSystemId, tagsById[fireteam.tagId], tagsById[fireteam.targetTagId])
}

function allTagsInCoordinateSystem(coordinateSystemId, ...tags) {
    for (let i = 0; i < tags.length; i++) {
        if (!tags[i] || tags[i].coordinateSystemId != coordinateSystemId) {
            return false;
        }
    }
    return true;
}

function targetLine(fireteam, tagsById, style) {
    return line(tagsById[fireteam.tagId], tagsById[fireteam.targetTagId], style);
}

function line(fromTag, toTag, style) {
    return {
        fromX: fromTag.position.x,
        fromY: fromTag.position.y,
        toX: toTag.position.x,
        toY: toTag.position.y,
        style: style
    }
}

const mapStateToProps = (state) => ({
    tagsById: state.tags.itemsById
});

export default connect(mapStateToProps)(RescueFloorPlans)
