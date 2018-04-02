import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import {getTagsOnFloor} from '../tags/selectors'

import TaggedObjectsList from '../tags/TaggedObjectsList'
import FloorPlan from './ZoomableFloorPlan'
import Panel from '../common/components/Panel'
import HeightExpander from "../common/components/HeightExpander";

const ViewFloorPlan  = ({map, tags, selectedTag, onSelectTag, onArtifactClick}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-4 colWithSmallerGutter">
                <Panel>
                    <TaggedObjectsList tags={tags} selected={selectedTag} onSelect={onSelectTag} onArtifactClick={onArtifactClick}/>
                </Panel>
            </div>
            <div className="col-sm-8 colWithSmallerGutter">
                { map ?
                    <Panel padding="0">
                        <HeightExpander>
                            <FloorPlan map={map} tags={tags} selectedTag={selectedTag} onClickTag={onSelectTag}/>
                        </HeightExpander>
                    </Panel>
                    : <span/>
                }
            </div>
        </div>
    </div>;


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
