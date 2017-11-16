import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

const TagValue = ({tag, link, history}) => tag ? <span>
            { link ?
                <a
                    style={{cursor: "pointer"}}
                    onClick={e => {e.stopPropagation(); history.push("/maps/" + tag.coordinateSystemId + "/" + tag.id)}}
                >
                    {tag.name}
                </a>
            : tag.name
            }
            <small style={{marginLeft: 10, color: "#AAA"}}>
                {tag.coordinateSystemName}
            </small>
    </span> :
    <span>nie wybrano</span>
    ;

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
