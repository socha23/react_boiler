import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Priority, Type} from '../artifacts/ArtifactVocs'
import {find} from '../common/vocFunctions'
import VocIcon from '../common/components/VocIcon'
import {getArtifactsByTagId} from '../artifacts/selectors'

let LocatedArtifact = ({locator, artifact, history}) => <div style={{marginTop: 3, marginBottom: 3}}>
    <VocIcon value={find(Type, artifact.type)} className="iconWithName"/>
    <a onClick={(e) => {
        e.stopPropagation();
        history.push("/artifacts/" + artifact.id)
    }}>{artifact.name}</a>
    <VocIcon value={find(Priority, artifact.priority)} className="pull-right"/>
</div>;

LocatedArtifact = withRouter(LocatedArtifact);

const LocatorObjectsList = ({
                                selected = {},
                                locators = [],
                                onSelect = () => {},
                                artifactsByTagId = {},
                                onUnpinLocator = () => {},
                                onEnterPinMode = () => {},
                            }) => <div>
    <table className="table table-hover table-pointer">
        <tbody>
        {locators.map(t => <tr key={t.id} className={selected == t ? 'success' : ''} onClick={() => {onSelect(t)}}>
            <td>
                {t.name}
                <br/>
                {t.pinned ?
                    <a style={{cursor: "pointer"}} onClick={(e) => {e.stopPropagation(); onUnpinLocator(t)}}>Odepnij</a>
                    :
                    <a style={{cursor: "pointer"}} onClick={(e) => {e.stopPropagation(); onEnterPinMode(t)}}>Przypnij</a>
                }
            </td>
            <td>
                {t.nearbyDevices
                    .map(d => artifactsByTagId[d.id])
                    .filter(a => a != null)
                    .map(a =>
                        <LocatedArtifact key={a.id} artifact={a}/>
                    )}
            </td>
        </tr>)
        }
        </tbody>
    </table>
</div>;

const mapStateToProps = (state, ownProps) => ({
    artifactsByTagId: getArtifactsByTagId(state)
});

export default connect(mapStateToProps)(LocatorObjectsList);