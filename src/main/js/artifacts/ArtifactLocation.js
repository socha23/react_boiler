import React from 'react'
import {withRouter} from 'react-router'

import {artifactLocator} from '../tags/locatorFunctions'
import {artifactTag} from '../tags/tagFunctions'

const ArtifactTagLocation = ({tag, history}) => <span>
    <a
        style={{cursor: "pointer"}}
        onClick={e => {e.stopPropagation(); history.push("/maps/" + tag.coordinateSystemId + "/" + tag.id)}}
    >
        {tag.coordinateSystemName} - {tag.areaName}
    </a>
</span>;

const ArtifactLocatorLocation = ({locator, history}) => <span>
    <a
        style={{cursor: "pointer"}}
        onClick={e => {e.stopPropagation(); history.push("/maps/outside/" + locator.id)}}
    >
        <small style={{color: "#AAA", marginRight: 10}}>
            Na zewnątrz
        </small>
        {locator.name}
    </a>
</span>;


const ArtifactLocation = ({artifact, tagsById, history}) => <div>
    {
        artifactLocator(artifact) ? <ArtifactLocatorLocation locator={artifactLocator(artifact)} history={history}/> :
            artifactTag(artifact) ? <ArtifactTagLocation tag={artifactTag(artifact)} history={history}/>
                : <span/>
    }
</div>;

export default withRouter(ArtifactLocation);
