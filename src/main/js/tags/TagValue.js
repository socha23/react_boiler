import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import {isMissing, isInside} from './tagHelpers'
import TagAreaName from './TagAreaName'
import MissingTag from './MissingTag'

const TagValue = ({tag, history, link = false, inline = false}) => {
    if (!tag) {
        return <span/>
    }
    if (isMissing(tag)) {
        return <MissingTag tag={tag}/>
    }
    let tagName = tag.name;
    if (isInside(tag) && link) {
        tagName = <a
                style={{cursor: "pointer"}}
                onClick={e => {e.stopPropagation(); history.push("/maps/" + tag.coordinateSystemId + "/" + tag.id)}}
                >
            {tag.name}
        </a>;
    }
    let separator = inline ? <span style={{marginLeft: 10}}/> : <br/>;
    return <span>
        {tagName}
        {separator}
        <TagAreaName tag={tag}/>
    </span>
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

export default withRouter(connect(mapStateToProps)(TagValue));
