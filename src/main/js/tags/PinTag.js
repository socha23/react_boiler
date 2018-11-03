import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {crudActions} from "../common/crud/crudContainers"

var SetPinned = ({tag, value, children, onUpdate, style}) => <span>
    <a
        style={{...style, cursor: "pointer"}}
        onClick={e => {onUpdate({...tag, pinned: value})}}
    >
        {children}
        </a>
</span>;

SetPinned = crudActions("tags", SetPinned);

const PinTag = ({tag, style={}, onEnterPinMode = null}) => {
    if (tag.pinned) {
        return <SetPinned style={style} tag={tag} value={null}>Odepnij</SetPinned>
    } else {
        if (!onEnterPinMode) {
            return <SetPinned style={style} tag={tag}value={tag.position}>Przypnij</SetPinned>
        } else {
            return <a style={{...style, cursor: "pointer"}} onClick={(e) => {e.stopPropagation(); onEnterPinMode()}}>Przypnij</a>
        }
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
