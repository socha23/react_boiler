import React from 'react'
import {connect} from 'react-redux'
import {isMissing} from './tagHelpers'
import {getLocatorsByTagId} from './selectors'

export const TagAreaNameComponent = ({tag, style, locatorsByTagId}) => {
    if (!tag) {
        return <span/>
    }
    let color = "#AAA";
    let text = tag.areaName;

    if (isMissing(tag)) {
        color = "#a94442"; // dark red from bootstrap
        text = "poza budynkiem";
    } else if (locatorsByTagId[tag.id]) {
        color = "#a94442"; // dark red from bootstrap
        text = locatorsByTagId[tag.id].name;
    }
    return <small style={{color: color, ...style}}>
        {text}
    </small>
};

const mapStateToProps = (state, ownProps) => {
    let tag = null;

    if (ownProps.tag) {
        tag = ownProps.tag
    } else if (ownProps.tagId) {
        tag = (state.tags.itemsById[ownProps.tagId])
    }
    return {
        tag: tag,
        locatorsByTagId: getLocatorsByTagId(state)
    }
};

export
    default
        connect(mapStateToProps)(TagAreaNameComponent);
