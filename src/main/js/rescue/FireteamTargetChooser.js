import React from 'react'
import {connect} from 'react-redux'

import {find} from '../common/vocFunctions'
import VocIcon from '../common/components/VocIcon'

import {Priority} from '../artifacts/ArtifactVocs'
import TagAreaName from '../tags/TagAreaName'


const FireteamTargetChooser = ({
    artifacts = [],
    fireteams = [],
    tags = [],
    tagsById = {},
    selected = {},
    onSelect = () => {
    }
    }) =>
    <ArtifactTargetChooser
        artifacts={artifacts}
        tagsById={tagsById}
        selectedTag={selected}
        onSelectTag={onSelect}
    />;

const ArtifactTargetChooser = ({
    artifacts = [],
    tagsById = {},
    selectedTag = {},
    onSelectTag = () => {
    }
    }) => <div>
    <table className="table table-hover table-pointer">
        <tbody>
        {
            artifacts.map(a =>
                <tr key={a.id}
                    className={selectedTag && selectedTag.id == a.tagId ? 'success' : ''}
                    onClick={() => onSelectTag(tagsById[a.tagId])}>
                    <td>
                        <ArtifactTarget artifact={a} tag={tagsById[a.tagId]}/>
                    </td>
                </tr>
            )
        }
        </tbody>
    </table>
</div>;

const itemDivStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    display: 'flex',
    alignItems: 'center'
};

const ArtifactTarget = ({artifact, tag}) => <div style={itemDivStyle}>
    <VocIcon value={find(Priority, artifact.priority)} className="iconWithName"/>
    <div>
        <span>{artifact.name}</span>
        <CommonTargetData tag={tag}/>
    </div>
</div>;


let CommonTargetData = ({tag, fireteams}) => <div>
    <TagAreaName tag={tag}/>
    {assignedFireteams(fireteams, tag.id).map(fireteam =>
        <span key={fireteam.id} style={{marginLeft: 10}} className="label label-success">{fireteam.name}</span>
    )}
</div>;

const ctdMapStateToProps = (state) => ({
    fireteams: state.fireteams.items
});

CommonTargetData = connect(ctdMapStateToProps)(CommonTargetData);


function assignedFireteams(fireteams, tagId) {
    return fireteams.filter(f => f.targetTagId == tagId)
}

const mapStateToProps = (state, {artifacts = []}) => ({
    artifacts: artifacts.filter(a => artifactNeedsToBeRescued(a, state.tags.itemsById)),
    tagsById: state.tags.itemsById
});

function artifactNeedsToBeRescued(artifact, tagsById) {
    return artifact.tagId && tagsById[artifact.tagId];
}

export default connect(mapStateToProps)(FireteamTargetChooser);