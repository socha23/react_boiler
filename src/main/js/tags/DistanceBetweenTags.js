import React from 'react'

import {isInside} from './tagHelpers'

export function distance(from, to) {
    let dx = from.position.x - to.position.x;
    let dy = from.position.y - to.position.y;
    return Math.ceil(Math.sqrt(dx * dx + dy * dy));
}

const DistanceBetweenTags = ({from, to}) => {
    if (!from || !to) {
        return <span/>
    } else if (!isInside(from) || !isInside(to)) {
        return <span>?</span>
    } else {
        return <span>{distance(from, to)}m</span>
    }
};

export default DistanceBetweenTags;
