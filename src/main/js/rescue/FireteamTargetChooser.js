import React from 'react'
import {connect} from 'react-redux'
import $ from 'jquery'

import {scrollTo} from '../common/componentHelpers'
import {find} from '../common/vocFunctions'
import VocIcon from '../common/components/VocIcon'
import TabPanel, {STYLE_LG} from '../common/components/TabPanel'

import {Priority} from '../artifacts/ArtifactVocs'
import {getArtifactsInside} from '../artifacts/selectors'
import {getAllFireteams, getFireteamsAssignedTo} from '../fireteams/selectors'
import {getLocatorsByTagId, getTagsById} from '../tags/selectors'
import TagAreaName from '../tags/TagAreaName'

import {getNavPoints} from './selectors'
import ShowArtifactViewInPopup from "../artifacts/ShowArtifactViewInPopup";

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

const FireteamTargetChooser = ({artifacts, fireteams, navPoints, selected, onSelect, ...props}) => {
    return <TabPanel
        {...props}
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
                    items={navPoints}
                    selectedTag={selected}
                    onSelectTag={onSelect}
                />
            }

        ]}/>
};

export default connect((state) => ({
    artifacts: getArtifactsInside(state),
    fireteams: getAllFireteams(state),
    navPoints: getNavPoints(state)
}))(FireteamTargetChooser);

const ArtifactChooser = (props) => <TargetChooser {...props} elem={ArtifactTarget}/>;

const ArtifactTarget = ({item, tag}) => <Target>
    <VocIcon value={find(Priority, item.priority)} className="iconWithName"/>

    <div style={{flex: 1}}>
        <TargetName>{item.name}</TargetName>
        <CommonTargetData tag={tag}/>
    </div>
    <ContainerIcon tag={tag}/>
    <ShowArtifactViewInPopup artifact={item}/>

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

class TargetChooser extends React.Component {

    static defaultProps = {
        elem: null,
        items: [],
        tagsById: {},
        selectedTag: {},
        onSelectTag: () => {
        }
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

    render = () =>
        <div style={{overflowY: "auto", height: "100%"}}>
            <table className="table table-hover table-pointer table-noTopPadding"
                   ref={e => this.rootElem = e}
            >
                <tbody>
                {
                    this.props.items
                        .filter(team => this.props.tagsById[team.tagId])
                        .map(a => {
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
            </table>
        </div>;

}

TargetChooser = connect((state) => ({
    tagsById: getTagsById(state)
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
    {fireteams.map(f =>
        <span key={f.id} style={{marginLeft: 10, fontSize: 16}} className="label label-success">{f.name}</span>
    )}
</div>;

CommonTargetData = connect((state, ownProps) => ({
    fireteams: getFireteamsAssignedTo(state, ownProps.tag),
}))(CommonTargetData);

let ContainerIcon = ({tag, locatorsByTagId}) => {
    let inside = locatorsByTagId[tag.id]
    let color =  inside ? "green" : "#ccc";
    return inside ? <span style={{fontSize: 24, color: color, marginRight: 10}}>
                <i className={"glyphicon glyphicon-ok"}/></span> : <span/>

};

ContainerIcon = connect((state, ownProps) => ({
    locatorsByTagId: getLocatorsByTagId(state),
}))(ContainerIcon);

