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

let Locator = ({locator, artifact, history}) => <div style={itemDivStyle}>
    {locator.name}
</div>;

Locator = withRouter(Locator);

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
                <Locator locator={t} artifact={artifactsByCrateId[t.id]}/>
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