import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {crudList} from '../common/crud/crudContainers'
import restActions from '../common/crud/crudActions'
import {MapList} from './MapList'
import {Panel, PanelWithTitle} from '../common/components/Panel'
import {runOnMount} from '../common/crud/crudContainers'

const TAG_SIZE = 20;

const Tag = ({id, color, position}) =>
    <div style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        backgroundColor: color,
        width: TAG_SIZE,
        height: TAG_SIZE,
        borderRadius: TAG_SIZE / 2,
        border: "1px solid black"
    }}>
    </div>;

const FloorPlan = ({map, tags = [{id: "t1", color: "red", position: {x: 150, y: 150}}]}) =>
    (map ? <div style={{position: "relative"}}>
        <img style={{width: "100%"}}
             src={map.base64content}
             title={map.name}/>
        {tags.map(t => <Tag {...t} key={t.id}/>)}
    </div> : <span/>);

const mapStateToProps = (state, ownProps) => {
    const myMapId = ownProps.map ? ownProps.map.id : ownProps.mapId;
    return {
        map: state.maps.items.find((m) => m.id == myMapId),
        tags: state.tags.items.filter((t) => t.coordinateSystemId == myMapId)
    }
};

const tagActions = restActions("tags");
const mapActions = restActions("maps");

const mapDispatchToProps = (dispatch) => ({
    onMount: () => {
        dispatch(tagActions.fetchItemsIfNeeded());
        dispatch(mapActions.fetchItemsIfNeeded());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(runOnMount(FloorPlan));
