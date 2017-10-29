import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import restActions from '../common/crud/crudActions'

import TaggedObjectsList from '../tags/TaggedObjectsList'
import FloorPlan from './ZoomableFloorPlan'
import {Panel, PanelWithTitle} from '../common/components/Panel'

const ViewFloorPlan  = ({map, tags, selectedTag, onSelectTag}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-4 colWithSmallerGutter">
                <Panel>
                    <TaggedObjectsList tags={tags} selected={selectedTag} onSelect={onSelectTag}/>
                </Panel>
            </div>
            <div className="col-sm-8 colWithSmallerGutter">
                { map ?
                    <Panel>
                        <FloorPlan map={map} tags={tags} selectedTag={selectedTag} onClickTag={onSelectTag}/>
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
        tags: state.tags.items.filter((t) => t.coordinateSystemId == myMapId),
        selectedTag: myTagId ? state.tags.items.find((m) => m.id == myTagId) : null,
        onSelectTag: (tag) => {
            ownProps.history.push("/maps/" + myMapId + "/" + tag.id)
        }
    }
};

export default withRouter(connect(mapStateToProps)(ViewFloorPlan));
