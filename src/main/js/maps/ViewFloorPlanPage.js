import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import {getTagsOnFloor} from '../tags/selectors'

import TaggedObjectsList from '../tags/TaggedObjectsList'
import FloorPlan from './ZoomableFloorPlan'
import Panel from '../common/components/Panel'
import HeightExpander from "../common/components/HeightExpander";

const ViewFloorPlan = ({map, tags, selectedTag, onSelectTag, onArtifactClick}) =>
    <HeightExpander>
        <div style={{height: "100%", display: "flex"}}>
            <div style={{width: "30%", marginLeft: 5, marginRight: 5, height: "100%", overflowY: "auto"}}>
                <Panel style={{display: "flex", flexDirection: "column"}}>
                    <div style={{flexGrow: 1}}>
                        <TaggedObjectsList tags={tags} selected={selectedTag} onSelect={onSelectTag}
                                           onArtifactClick={onArtifactClick}/>
                    </div>
                </Panel>
            </div>
            <div style={{flexGrow: 1, height: "100%", border: "1px solid #ddd", borderRadius: 4, marginLeft: 5, marginRight: 5}}>
                {map ?
                            <FloorPlan map={map} tags={tags} selectedTag={selectedTag} onClickTag={onSelectTag}/>
                    : <span/>
                }

            </div>
        </div>

    </HeightExpander>;


const mapStateToProps = (state, ownProps) => {
    const myMapId = ownProps.map ? ownProps.map.id : ownProps.mapId;
    const myTagId = ownProps.tagId;
    return {
        map: state.floorPlans.items.find((m) => m.id == myMapId),
        tags: getTagsOnFloor(state, myMapId),
        selectedTag: myTagId ? state.tags.items.find((m) => m.id == myTagId) : null,
        onSelectTag: (tag) => {
            ownProps.history.push("/maps/" + myMapId + "/" + tag.id)
        },
        onArtifactClick: (artifact) => {
            ownProps.history.push("/artifacts/" + artifact.id)
        }
    }
};

export default withRouter(connect(mapStateToProps)(ViewFloorPlan));
