import React from 'react'
import {connect} from 'react-redux'
import {artifactsByTagId} from './tagHelpers'
import {Priority, Type} from '../artifacts/ArtifactVocs'
import {find} from '../common/vocFunctions'
import VocIcon from '../common/components/VocIcon'

const itemDivStyle = {
    paddingTop: 5,
    paddingBottom: 5
};

let TaggedArtifact = ({tag, artifact, history, onClick, onEnterPinMode, onUnpinArtifact}) => <div style={itemDivStyle}>
    <VocIcon value={find(Type, artifact.type)} className="iconWithName"/>
    {onClick ?
        <a onClick={(e) => {e.stopPropagation(); onClick(artifact)}}>{artifact.name}</a>
        :
        <span>{artifact.name}</span>
    }

    <small style={{marginLeft: 10, color: "#AAA"}}>
        {tag.areaName}
    </small>


    <span style={{marginLeft: 10}}>
    {tag.pinned ?
        <a style={{cursor: "pointer"}} onClick={(e) => {e.stopPropagation(); onUnpinArtifact(artifact)}}>Odepnij</a>
        :
        <a style={{cursor: "pointer"}} onClick={(e) => {e.stopPropagation(); onEnterPinMode(artifact)}}>Przypnij</a>
    }
    </span>
    <VocIcon value={find(Priority, artifact.priority)} className="pull-right"/>
</div>;

const Tag = ({tag}) => <div style={itemDivStyle}>
    <span style={{marginLeft: 26}}>{tag.name}</span>
    <small style={{marginLeft: 10, color: "#AAA"}}>
        {tag.areaName}
    </small>
</div>;

const TaggedObjectsList = ({
    selected = {},
    tags = [],
    onSelect = () => {},
    artifactsByTagId = {},
    onArtifactClick,
    onEnterPinMode,
    onUnpinArtifact
    }) => <div>
    <table className="table table-hover table-pointer">
        <tbody>
        {tags.map(t => <tr key={t.id} className={selected && selected.id == t.id ? 'success' : ''} onClick={() => {onSelect(t)}}>
            <td>
                {
                    artifactsByTagId[t.id] ?
                        <TaggedArtifact tag={t} artifact={artifactsByTagId[t.id]} onClick={onArtifactClick} onEnterPinMode={onEnterPinMode} onUnpinArtifact={onUnpinArtifact}/>
                        : <Tag tag={t}/>
                }
            </td>
        </tr>)
        }
        </tbody>
    </table>
</div>;

const mapStateToProps = (state, ownProps) => ({
    artifactsByTagId: artifactsByTagId(state.artifacts.items)
});

export default connect(mapStateToProps)(TaggedObjectsList);