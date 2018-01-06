import React from 'react'
import {connect} from 'react-redux'
import {isMissing, isInContainer} from './tagHelpers'

export const TagAreaNameComponent = ({tag, style}) => {
    if (!tag) {
        return <span/>
    }
    let color = "#AAA";
    let text = tag.areaName;

    if (isMissing(tag)) {
        color = "#a94442"; // dark red from bootstrap
        text = "poza budynkiem";
    } else if (isInContainer(tag)) {
        color = "#a94442"; // dark red from bootstrap
        text = "w kontenerze";
    }
    return <small style={{color: color, ...style}}>
        {text}
    </small>
};

const mapStateToProps = (state, ownProps) => {
    if (ownProps.tag) {
        return {tag: ownProps.tag}
    } else if (ownProps.tagId) {
        return {tag: (state.tags.itemsById[ownProps.tagId])}
    } else {
        return {tag: null};
    }
};

export
    default
        connect(mapStateToProps)(TagAreaNameComponent);
