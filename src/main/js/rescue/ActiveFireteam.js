import React from 'react'
import {connect} from 'react-redux'

import Panel from '../common/components/Panel'

import {tagDescriptionsByTagId} from '../tags/tagHelpers'
import TagAreaName from '../tags/TagAreaName'
import DistanceBetweenTags from '../tags/DistanceBetweenTags'

import PanMapButton from './PanMapButton'

const ActiveFireteam = ({
    fireteam,
    fireteamTag,
    targetTag,
    tagDescriptionsByTagId = {},
    onSelectTagOnMap = () => {}
    }) => <div style={{minHeight: 100}}>
    <div style={{display: "flex"}}>
        <div style={{flex: 1}}>
            <span style={{fontWeight: "bold", fontSize: 20, marginRight: 10}}>
                {fireteam.name}
            </span>
            <TagAreaName tag={fireteamTag}/>
        </div>
        <PanMapButton onClick={onSelectTagOnMap}/>
    </div>
    <div>
        <FireteamTarget fireteamTag={fireteamTag} targetTag={targetTag} tagDescriptionsByTagId={tagDescriptionsByTagId}/>
    </div>
</div>;

const FireteamTarget = ({fireteamTag, targetTag, tagDescriptionsByTagId = {}}) =>
    targetTag ?
        <span style={{fontSize: 20}}>
            Cel: {tagDescriptionsByTagId[targetTag.id]} - <DistanceBetweenTags from={fireteamTag} to={targetTag}/>
        </span>

        :
        <span>Nie ustawiono celu</span>
;

const mapStateToProps = (state, ownProps) => ({
    tagDescriptionsByTagId: tagDescriptionsByTagId(state.tags.items, state.artifacts.items, state.fireteams.items),
    fireteamTag: state.tags.itemsById[ownProps.fireteam.tagId],
    targetTag: ownProps.fireteam.targetTagId ? state.tags.itemsById[ownProps.fireteam.targetTagId] : null
});

export default connect(mapStateToProps)(ActiveFireteam);