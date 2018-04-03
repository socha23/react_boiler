import React from 'react'

import {isInside} from './tagHelpers'

export function distance(from, to) {
    let dx = from.position.x - to.position.x;
    let dy = from.position.y - to.position.y;
    return Math.sqrt(dx * dx + dy * dy);
}

const DistanceBetweenTags = ({from, to, showUnit=true}) => {
    if (!from || !to) {
        return <span/>
    } else if (!isInside(from) || !isInside(to)) {
        return <span>?</span>
    } else {
        return <span>
            {Math.ceil(distance(from, to))}
            {showUnit ? "m" : <span/>}
        </span>
    }
};

export default DistanceBetweenTags;
