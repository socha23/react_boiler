import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {find} from '../common/vocFunctions'
import VocIcon from '../common/components/VocIcon'
import TabPanel, {STYLE_LG} from '../common/components/TabPanel'

import {Priority} from '../artifacts/ArtifactVocs'
import TagAreaName from '../tags/TagAreaName'

const FireteamTargetChooser = ({
        artifacts = [],
        fireteams = [],
        tags = [],
        tagsById = {},
        selected = {},
        onSelect = () => {
        },
        additionalMargin = 0
        }) => {
    let activeTab = 0;
    if (selected && selected.id) {
        if (artifacts.find(a => a.tagId == selected.id)) {
            activeTab = 0;
        } else if (fireteams.find(f => f.tagId == selected.id)) {
            activeTab = 1;
        } else {
            activeTab = 2;
        }
    }

    return <TabPanel
            heightExpander={true}
            additionalMargin={additionalMargin}
            padding={0}
            tabStyle={STYLE_LG}
            activeTab={activeTab}
            tabs={[
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

    ]}/>
};

const ArtifactChooser = (props) => <TargetChooser {...props} elem={ArtifactTarget}/>;

const ArtifactTarget = ({item, tag}) => <Target>
    <VocIcon value={find(Priority, item.priority)} className="iconWithName"/>

    <div style={{flex: 1}}>
        <span>{item.name}</span>
        <CommonTargetData tag={tag}/>
    </div>
</Target>;

const FireteamChooser = (props) => <TargetChooser {...props} elem={FireteamTarget}/>;

const FireteamTarget = ({item, tag}) => <Target>
    <div style={{flex: 1}}>
        <span>{item.name}</span>
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
        let elem = $(this.elemsByTagId[tag.id]);
        if (!elem || !elem.offset()) {
            return;
        }
        let elemTop = elem.offset().top;
        let container = $(this.rootElem).parent();

        if (container.scrollTop() > elemTop) {
            container.scrollTop(elemTop);
        }

        if (container.scrollTop() + container.height() < elemTop ) {
            container.scrollTop(elemTop);
        }
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