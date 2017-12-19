import React from 'react'
import {connect} from 'react-redux'

const TagAreaName = ({tag, style}) => tag ?
    <small style={{color: "#AAA", ...style}}>
        {tag.areaName}
    </small>
    :
    <span/>;

const mapStateToProps = (state, ownProps) => {
    if (ownProps.tag) {
        return {tag: ownProps.tag}
    } else if (ownProps.tagId) {
        return {tag: (state.tags.itemsById[ownProps.tagId])}
    } else {
        return {tag: null};
    }
};

export default connect(mapStateToProps)(TagAreaName);
