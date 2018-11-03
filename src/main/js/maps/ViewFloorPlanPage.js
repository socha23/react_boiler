import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import {getTagsOnFloor} from '../tags/selectors'

import TaggedObjectsList from '../tags/TaggedObjectsList'
import FloorPlan from './ZoomableFloorPlan'
import Panel from '../common/components/Panel'
import HeightExpander from "../common/components/HeightExpander";

const ViewFloorPlan = ({map, tags, selectedTag, onSelectTag, onArtifactClick, pinMode, onEnterPinMode, children}) =>
    <HeightExpander>
        <div style={{height: "100%", display: "flex"}}>
            <div style={{width: "30%", marginLeft: 5, marginRight: 5, height: "100%", overflowY: "auto"}}>
                <Panel style={{display: "flex", flexDirection: "column"}}>
                    <div style={{flexGrow: 1}}>
                        <TaggedObjectsList tags={tags} selected={selectedTag} onSelect={onSelectTag}
                                           onEnterPinMode={onEnterPinMode}
                                           onArtifactClick={onArtifactClick}/>
                    </div>
                </Panel>
            </div>
            <div style={{flexGrow: 1, height: "100%", border: "1px solid #ddd", borderRadius: 4, marginLeft: 5, marginRight: 5}}>
                {map ?
                    <FloorPlan map={map} tags={tags} selectedTag={selectedTag} onClickTag={onSelectTag} pinMode={pinMode}>{children}</FloorPlan>
                    : <span/>
                }

            </div>
        </div>

    </HeightExpander>;


class ViewFloorPlanWithPinning extends React.Component {

    state = {
        pinMode: false,
        artifactBeingPinned: null
    };

    render = () => {
        return <ViewFloorPlan {...this.props} pinMode={this.state.pinMode} onEnterPinMode={this.onEnterPinMode}>
            {
                this.state.pinMode ?
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", padding: 20}}>
                    <div className={"panel panel-info"}>
                        <div className={"panel-heading"}>
                            <span style={{fontSize: 30}}>
                                <span>Przypnij <b>{this.state.artifactBeingPinned.name}</b> kliknięciem</span>
                                <span onClick={this.onCancelPinMode} style={{marginLeft: 20}}>
                                    <i style={{cursor: "pointer"}} className={"pull-right glyphicon glyphicon-remove"}/>
                                </span>
                            </span>
                        </div>
                    </div>

                </div>
                    : <span/>
            }

        </ViewFloorPlan>
    };

    componentWillReceiveProps = (nextProps) => {
        if (this.props.map && this.props.map.id != nextProps.map.id) {
            this.onCancelPinMode();
        }
    };


    onCancelPinMode = () => {
        this.setState({
            pinMode: false,
            artifactBeingPinned: null
        })
    };

    onEnterPinMode = (artifact) => {
        this.setState({
            pinMode: true,
            artifactBeingPinned: artifact
        })
    }
}

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

export default withRouter(connect(mapStateToProps)(ViewFloorPlanWithPinning));
