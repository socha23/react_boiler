import React from 'react'
import {connect} from 'react-redux'

import * as vocFunctions from '../common/vocFunctions'

import {Type} from '../artifacts/ArtifactVocs'

const TagMapIcon = ({tag, artifacts, fireteams}) => {
    let content = <span>X</span>;
    let className = "label-info"; // ltblue
    for (let i = 0; i < artifacts.length; i++) {
        if (tag.id == artifacts[i].tagId) {
            content = <i className={vocFunctions.find(Type, artifacts[i].type).iconClass}/>;
            className = "label-success"; // green
        }
    }
    for (let i = 0; i < fireteams.length; i++) {
        if (tag.id == fireteams[i].tagId) {
            content = <i className="glyphicon glyphicon-fire" />;
            className = "label-danger"; // red
        }
    }
    return <h4 style={{textShadow: "2px 2px 4px #444"}}>
        <span style={{boxShadow: "4px 4px 10px #666"}} className={"label " + className}>{content}</span>
    </h4>
};



const mapStateToProps = (state, ownProps) => ({
    artifacts: state.artifacts.items,
    fireteams: state.fireteams.items
});

export default connect(mapStateToProps)(TagMapIcon);
