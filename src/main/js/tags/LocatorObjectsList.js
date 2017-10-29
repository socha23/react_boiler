import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {artifactsByCrateId} from './locatorHelpers'
import {Type, Priority} from '../artifacts/ArtifactVocs'
import {find} from '../common/vocFunctions'
import VocIcon from '../common/components/VocIcon'

const itemDivStyle = {
    paddingTop: 5,
    paddingBottom: 5
};

let LocatedArtifact = ({locator, artifact, history}) => <div style={itemDivStyle}>
    <VocIcon value={find(Type, artifact.type)} className="iconWithName"/>
    <a onClick={(e) => {e.stopPropagation(); history.push("/artifacts/" + artifact.id)}}>{artifact.name}</a>
    <small style={{marginLeft: 10, color: "#AAA"}}>
        {locator.name}
    </small>
    <VocIcon value={find(Priority, artifact.priority)} className="pull-right"/>
</div>;

LocatedArtifact = withRouter(LocatedArtifact);

const Locator = ({locator}) => <div style={itemDivStyle}>
    <span style={{marginLeft: 26}}>{locator.name}</span>
</div>;


const LocatorObjectsList = ({
    selected = {},
    locators = [],
    onSelect = () => {},
    artifactsByCrateId = {}
    }) => <div>
    <table className="table table-hover table-pointer">
        <tbody>
        {locators.map(t => <tr key={t.id} className={selected == t ? 'success' : ''} onClick={() => {onSelect(t)}}>
            <td>
                {
                    artifactsByCrateId[t.id] ?
                        <LocatedArtifact locator={t} artifact={artifactsByCrateId[t.id]}/>
                        : <Locator locator={t}/>
                }
            </td>
        </tr>)
        }
        </tbody>
    </table>
</div>;

const mapStateToProps = (state, ownProps) => ({
    artifactsByCrateId: artifactsByCrateId(state.artifacts.items)
});

export default connect(mapStateToProps)(LocatorObjectsList);