import React from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

import MissingTag from '../tags/MissingTag'
import {artifactLocator} from "../tags/locatorHelpers"
import {artifactTag} from "../tags/tagHelpers"

const ArtifactTagLocation = ({tag, history}) => <span>
    {tag.missing ? <MissingTag/> :
            <a
                    style={{cursor: "pointer"}}
                    onClick={e => {e.stopPropagation(); history.push("/maps/" + tag.coordinateSystemId + "/" + tag.id)}}
                    >
                {tag.coordinateSystemName} - {tag.areaName}
            </a>
    }
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


const ArtifactLocation = ({artifact, tags, locators, history}) => <div>
    {
        artifactLocator(locators, artifact) ? <ArtifactLocatorLocation locator={artifactLocator(locators, artifact)} history={history}/> :
            artifactTag(tags, artifact) ? <ArtifactTagLocation tag={artifactTag(tags, artifact)} history={history}/>
                : <span/>
    }
</div>;

const mapStateToProps = (state, ownProps) => {
    return {
        tags: state.tags.items,
        locators: state.locators.items
    };
};

export default withRouter(connect(mapStateToProps)(ArtifactLocation));
