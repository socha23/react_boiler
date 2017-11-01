import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {artifactsByCurrentLocatorId} from './locatorHelpers'
import {Type, Priority} from '../artifacts/ArtifactVocs'
import {find} from '../common/vocFunctions'
import VocIcon from '../common/components/VocIcon'

let LocatedArtifact = ({locator, artifact, history}) => <div>
    <VocIcon value={find(Type, artifact.type)} className="iconWithName"/>
    <a onClick={(e) => {e.stopPropagation(); history.push("/artifacts/" + artifact.id)}}>{artifact.name}</a>
    <VocIcon value={find(Priority, artifact.priority)} className="pull-right"/>
</div>;

LocatedArtifact = withRouter(LocatedArtifact);

const LocatorObjectsList = ({
    selected = {},
    locators = [],
    onSelect = () => {},
    artifactsByCurrentLocatorId = {}
    }) => <div>
    <table className="table table-hover table-pointer">
        <tbody>
        {locators.map(t => <tr key={t.id} className={selected == t ? 'success' : ''} onClick={() => {onSelect(t)}}>
            <td>{t.name}</td>
            <td>
                {(artifactsByCurrentLocatorId[t.id] || []).map(a =>
                    <LocatedArtifact key={a.id} artifact={a}/>
                )}
            </td>
        </tr>)
        }
        </tbody>
    </table>
</div>;

const mapStateToProps = (state, ownProps) => ({
    artifactsByCurrentLocatorId: artifactsByCurrentLocatorId(state.artifacts.items)
});

export default connect(mapStateToProps)(LocatorObjectsList);