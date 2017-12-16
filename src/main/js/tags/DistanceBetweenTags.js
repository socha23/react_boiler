import React from 'react'
import {connect} from 'react-redux'

function distance(from, to) {
    let dx = from.position.x - to.position.x;
    let dy = from.position.y - to.position.y;
    return Math.ceil(Math.sqrt(dx * dx + dy * dy));
}

const DistanceBetweenTags = ({from, to}) => from && to ? (
    from.coordinateSystemId != to.coordinateSystemId ?
        <span>inne piętro</span>
        :
        <span>{distance(from, to)}m</span>
) : <span/>;

export default DistanceBetweenTags;
