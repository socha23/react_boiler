import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {crudList} from '../common/crud/crudContainers'
import restActions from '../common/crud/crudActions'
import {MapList} from './MapList'
import {Panel, PanelWithTitle} from '../common/components/Panel'
import {runOnMount} from '../common/crud/crudContainers'
import ResizeAware from 'react-resize-aware';

const TAG_SIZE = 20;

const Tag = ({id, color, pxPosition, name}) =>
    <div
        title={name}
        style={{
        position: "absolute",
        left: pxPosition.x,
        top: pxPosition.y,
        backgroundColor: color,
        width: TAG_SIZE,
        height: TAG_SIZE,
        borderRadius: TAG_SIZE / 2,
        border: "1px solid black"
    }}>
    </div>;

function rescaleToPx(posUnits, fromUnits, toUnits, maxPx) {
    let widthUnits = toUnits - fromUnits;
    let unitsToPx = maxPx / widthUnits;
    return (posUnits - fromUnits) * unitsToPx;

}

function pxPosition(map, position, containerWidth, containerHeight) {
    if (position) {
        return {
            x: rescaleToPx(position.x, map.topLeft.x, map.bottomRight.x, containerWidth),
            y: rescaleToPx(position.y, map.topLeft.y, map.bottomRight.y, containerHeight)
        }
    } else {
        return {x: 0, y: 0}
    }


    console.log(containerWidth + " x " + containerHeight);
    return position;
}

const FloorPlanBody = ({map, tags, width, height}) => <div>
    <img style={{width: "100%"}}
         src={map.base64content}
    />
    {tags.map(t =>
        <Tag {...t}
            key={t.id}
            pxPosition={pxPosition(map, t.position, width, height)}
        />
    )}
</div>;

const FloorPlan = (props) =>
    (props.map ? <ResizeAware style={{position: "relative"}}>
        <FloorPlanBody {...props}/>
    </ResizeAware> : <span/>);

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
