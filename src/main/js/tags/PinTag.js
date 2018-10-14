import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {crudActions} from "../common/crud/crudContainers"

var SetPinned = ({tag, value, children, onUpdate}) => <span>
    <a
        style={{cursor: "pointer"}}
        onClick={e => {onUpdate({...tag, pinned: value})}}
    >
        {children}
        </a>
</span>;

SetPinned = crudActions("tags", SetPinned);

const PinTag = ({tag}) => {
    if (tag.pinned) {
        return <SetPinned tag={tag} value={null}>Odepnij</SetPinned>
    } else {
        return <SetPinned tag={tag}value={tag.position}>Przypnij</SetPinned>

    }
};

const mapStateToProps = (state, ownProps) => {
    if (ownProps.tag) {
        return {tag: ownProps.tag}
    } else if (ownProps.tagId) {
        return {tag: (state.tags.items || []).find(t => t.id == ownProps.tagId)}
    } else {
        return {tag: null};
    }
};

export default withRouter(connect(mapStateToProps)(PinTag));
