import React from 'react'
import {connect} from 'react-redux'

import {find} from '../common/vocFunctions'
import VocIcon from '../common/components/VocIcon'
import TabPanel from '../common/components/TabPanel'

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
    }) => <TabPanel heightExpander={true} padding={0} tabs={[
        {
            label: "Muzealia",
            body: <ArtifactChooser
                    items={artifacts}
                    tagsById={tagsById}
                    selectedTag={selected}
                    onSelectTag={onSelect}
                />
        },
        {
            label: "Roty",
            body: <FireteamChooser
                    items={fireteams}
                    tagsById={tagsById}
                    selectedTag={selected}
                    onSelectTag={onSelect}
                />
        },
        {
            label: "Nawigacja",
            body: <NavPointChooser
                    items={navPoints(tags, artifacts, fireteams)}
                    tagsById={tagsById}
                    selectedTag={selected}
                    onSelectTag={onSelect}
                />
        }

    ]}/>;

const ArtifactChooser = (props) => <TargetChooser {...props} elem={ArtifactTarget}/>;

const ArtifactTarget = ({item, tag}) => <Target>
    <VocIcon value={find(Priority, item.priority)} className="iconWithName"/>
    <div>
        <span>{item.name}</span>
        <CommonTargetData tag={tag}/>
    </div>
</Target>;

const FireteamChooser = (props) => <TargetChooser {...props} elem={FireteamTarget}/>;

const FireteamTarget = ({item, tag}) => <Target>
    <div>
        <span>{item.name}</span>
        <CommonTargetData tag={tag}/>
    </div>
</Target>;

// they are the same so far
const NavPointChooser = FireteamChooser;

function navPoints(tags, artifacts, fireteams) {
    let result = [];
    let nonNavTagIds = {};
    artifacts.forEach(a => {if (a.tagId) nonNavTagIds[a.tagId] = a.tagId});
    fireteams.forEach(a => {if (a.tagId) nonNavTagIds[a.tagId] = a.tagId});
    tags.forEach(t => {
        if (!nonNavTagIds[t.id]) {
            result.push({...t, tagId: t.id});
        }
    });
    return result;
}

const TargetChooser = ({
    items = [],
    tagsById = {},
    selectedTag = {},
    onSelectTag = () => {},
    elem
    }) =>
    <table className="table table-hover table-pointer table-noTopPadding">
        <tbody>
        {
            items.map(a =>
                <tr key={a.id}
                    className={selectedTag && selectedTag.id == a.tagId ? 'success' : ''}
                    onClick={() => onSelectTag(tagsById[a.tagId])}>
                    <td>
                        {elem({item: a, tag: tagsById[a.tagId]})}
                    </td>
                </tr>
            )
        }
        </tbody>
    </table>;


const Target = ({children}) => <div style={{
    paddingTop: 5,
    paddingBottom: 5,
    display: 'flex',
    alignItems: 'center'
}}>{children}</div>;

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