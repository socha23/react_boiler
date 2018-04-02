import React from 'react'
import {connect} from 'react-redux'

import {getTagsInsideByCoordinateSystemId} from '../tags/selectors'
import {getFloorPlans} from '../maps/selectors'
import {getFireteamAndTargetTags} from '../fireteams/selectors'

import TabPanel, {STYLE_LG} from '../common/components/TabPanel'

import ZoomableFloorPlan from '../maps/ZoomableFloorPlan'
import {STYLE_ANIMATED_GREEN} from '../maps/Line'


let RescueFloorPlan = ({floorPlan, tags, markedTag, onSelect, additionalMargin, targetLines, tagDecorations}) => <ZoomableFloorPlan
                        map={floorPlan}
                        tags={tags}
                        tagDecorations={tagDecorations}
                        selectedTag={markedTag}
                        onClickTag={onSelect}
                        additionalMargin={additionalMargin}
                        lines={targetLines}
                        />;


RescueFloorPlan = connect((state, ownProps) => ({
    tags: getTagsInsideByCoordinateSystemId(state)[ownProps.floorPlan.id],
    tagDecorations: tagDecorations(ownProps.selectedTarget, ownProps.selectedFireteam),
    targetLines: getFireteamAndTargetTags(state, ownProps.floorPlan.id).map(t => line(t.fireteamTag, t.targetTag, STYLE_ANIMATED_GREEN))
}))(RescueFloorPlan);


function tagDecorations(selectedTargetTag, selectedFireteam) {
    const result = {};
    if (selectedTargetTag) {
        result[selectedTargetTag.id] = "pulseGlowBlue"
    }
    if (selectedFireteam) {
        result[selectedFireteam.tagId] = "pulseGlowRed"
    }
    return result
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

class RescueFloorPlans extends React.Component {
    static defaultProps = {
        selectedTarget: null,
        selectedFireteam: null,
        floorPlans: [],
        markedTag: null,
        onSelect: () => {},
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
                    {...this.props}
                    tabStyle={STYLE_LG}
                    padding={0}
                    activeTab={this.state.activeTab}
                    onTabChange={this.onTabChange}
                    tabs={
               this.props.floorPlans.map(fp => ({
                    label: fp.name,
                    body: <RescueFloorPlan
                        floorPlan={fp}
                        markedTag={this.props.markedTag}
                        selectedTarget={this.props.selectedTarget}
                        selectedFireteam={this.props.selectedFireteam}
                        onSelect={this.props.onSelect}
                        additionalMargin={this.props.additionalMargin}
                        />
               }))
            }/>
}

export default connect((state) => ({
    floorPlans: getFloorPlans(state)
}))(RescueFloorPlans)
