import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {scrollTo} from '../common/componentHelpers'
import {find} from '../common/vocFunctions'
import VocIcon from '../common/components/VocIcon'
import TabPanel, {STYLE_LG} from '../common/components/TabPanel'

import {Priority} from '../artifacts/ArtifactVocs'
import TagAreaName from '../tags/TagAreaName'

function findActiveTab(selected, artifacts = [], fireteams = []) {
    if (selected && selected.id) {
        if (artifacts.find(a => a.tagId == selected.id)) {
            return 0;
        } else if (fireteams.find(f => f.tagId == selected.id)) {
            return 1;
        } else {
            return 2;
        }
    } else {
        return 0;
    }
}

const FireteamTargetChooser = ({artifacts, fireteams, tags, selected, onSelect, additionalMargin = 0}) => {

    return <TabPanel
            heightExpander={true}
            additionalMargin={additionalMargin}
            padding={0}
            tabStyle={STYLE_LG}
            activeTab={findActiveTab(selected, artifacts, fireteams)}
            tabs={[
        {
            label: "Muzealia",
            body: <ArtifactChooser
                    items={artifacts}
                    selectedTag={selected}
                    onSelectTag={onSelect}
                />
        },
        {
            label: "Roty",
            body: <FireteamChooser
                    items={fireteams}
                    selectedTag={selected}
                    onSelectTag={onSelect}
                />
        },
        {
            label: "Nawigacja",
            body: <NavPointChooser
                    items={navPoints(tags, artifacts, fireteams)}
                    selectedTag={selected}
                    onSelectTag={onSelect}
                />
        }

    ]}/>
};

const mapStateToProps = (state) => ({
    artifacts: (state.artifacts.items || []).filter(a => artifactNeedsToBeRescued(a, state.tags.itemsById)),
    fireteams: state.fireteams.items || [],
    tags: state.tags.items || []
});

function artifactNeedsToBeRescued(artifact, tagsById) {
    return artifact.tagId && tagsById[artifact.tagId];
}

export default connect(mapStateToProps)(FireteamTargetChooser);

const ArtifactChooser = (props) => <TargetChooser {...props} elem={ArtifactTarget}/>;

const ArtifactTarget = ({item, tag}) => <Target>
    <VocIcon value={find(Priority, item.priority)} className="iconWithName"/>

    <div style={{flex: 1}}>
        <TargetName>{item.name}</TargetName>
        <CommonTargetData tag={tag}/>
    </div>
</Target>;

const FireteamChooser = (props) => <TargetChooser {...props} elem={FireteamTarget}/>;

const FireteamTarget = ({item, tag}) => <Target>
    <div style={{flex: 1}}>
        <TargetName>{item.name}</TargetName>
        <CommonTargetData tag={tag}/>
    </div>
</Target>;

// they are the same so far
const NavPointChooser = FireteamChooser;

function navPoints(tags, artifacts, fireteams) {
    let result = [];
    let nonNavTagIds = {};
    artifacts.forEach(a => {
        if (a.tagId) nonNavTagIds[a.tagId] = a.tagId
    });
    fireteams.forEach(a => {
        if (a.tagId) nonNavTagIds[a.tagId] = a.tagId
    });
    tags.forEach(t => {
        if (!nonNavTagIds[t.id]) {
            result.push({...t, tagId: t.id});
        }
    });
    return result;
}

class TargetChooser extends React.Component {

    static defaultProps = {
            elem: null,
            items: [],
            tagsById: {},
            selectedTag: {},
            onSelectTag: () => {}
    };

    state = {
        lastSelectedTag: {}
    };

    elemsByTagId = {};

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.selectedTag && nextProps.selectedTag.id != this.state.lastSelectedTag.id) {
            this.setState({lastSelectedTag: nextProps.selectedTag});
            this.panToTag(nextProps.selectedTag);
        }
    };

    panToTag = (tag) => {
        const elem = $(this.elemsByTagId[tag.id]);
        const container = $(this.rootElem).parent();
        scrollTo(container, elem);
    };

    onSelectTag = (tag) => {
        this.setState({lastSelectedTag: tag});
        this.props.onSelectTag(tag);
    };

    render = () => <table className="table table-hover table-pointer table-noTopPadding"
            ref={e => this.rootElem = e}
            >
        <tbody>
        {
            this.props.items.map(a => {
                let tag = this.props.tagsById[a.tagId];
                return <tr key={a.id}
                           className={this.props.selectedTag && this.props.selectedTag.id == a.tagId ? 'info' : ''}
                           onClick={() => this.onSelectTag(tag)}
                           ref={e => this.elemsByTagId[tag.id] = e}
                        >
                    <td>
                        {this.props.elem({
                            item: a,
                            tag: tag
                        })}
                    </td>
                </tr>
            })
        }
        </tbody>
    </table>;
}

TargetChooser = connect((state) => ({
    tagsById: state.tags.itemsById
}))(TargetChooser);


const Target = ({children}) => <div style={{
    paddingTop: 5,
    paddingBottom: 5,
    display: 'flex',
    alignItems: 'center'
}}>{children}</div>;

const TargetName = ({children}) => <span style={{fontSize: 20}}>{children}</span>;

let CommonTargetData = ({tag, fireteams}) => <div>
    <TagAreaName tag={tag} style={{fontSize: 16}}/>
    {assignedFireteams(fireteams, tag.id).map(fireteam =>
                    <span key={fireteam.id} style={{marginLeft: 10, fontSize: 16}} className="label label-success">{fireteam.name}</span>
    )}
</div>;

CommonTargetData = connect((state) => ({
    fireteams: state.fireteams.items
}))(CommonTargetData);


function assignedFireteams(fireteams, tagId) {
    return fireteams.filter(f => f.targetTagId == tagId)
}
