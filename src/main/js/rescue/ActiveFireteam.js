import React from 'react'
import {connect} from 'react-redux'

import Panel from '../common/components/Panel'

import {tagDescriptionsByTagId} from '../tags/tagHelpers'
import TagAreaName from '../tags/TagAreaName'
import DistanceBetweenTags from '../tags/DistanceBetweenTags'
import * as fireteamActions from '../fireteams/fireteamActions'

const ActiveFireteam = ({fireteam, fireteamTag, targetTag, selectedTag, tagDescriptionsByTagId = {}, onSetTargetTag = () => {
}}) => <div style={{minHeight: 150}}>
    <div>
        <span style={{fontWeight: "bold", fontSize: 18, marginRight: 10}}>
            {fireteam.name}
        </span>
        <TagAreaName tag={fireteamTag}/>
    </div>
    <div>
        <FireteamTarget fireteamTag={fireteamTag} targetTag={targetTag} tagDescriptionsByTagId={tagDescriptionsByTagId}/>
    </div>
    <div>
        {selectedTag && selectedTag.id != fireteamTag.id ? <SetTargetButton fireteam={fireteam} fireteamTag={fireteamTag} targetTag={selectedTag} tagDescriptionsByTagId={tagDescriptionsByTagId} onSetTargetTag={onSetTargetTag}/> : <span/>}
        {fireteam.targetTagId ? <ClearTargetButton fireteam={fireteam} onSetTargetTag={onSetTargetTag}/> : <span/>}
    </div>
</div>;

const FireteamTarget = ({fireteamTag, targetTag, tagDescriptionsByTagId = {}}) =>
    targetTag ?
        <span>
            Cel: {tagDescriptionsByTagId[targetTag.id]} - <DistanceBetweenTags from={fireteamTag} to={targetTag}/>
        </span>

        :
        <span>Nie ustawiono celu</span>
;

const SetTargetButton = ({fireteam, fireteamTag, targetTag, tagDescriptionsByTagId, onSetTargetTag}) =>
    <a className="btn btn-block btn-default" onClick={() => onSetTargetTag(fireteam, targetTag)}>
        Ustaw cel: {tagDescriptionsByTagId[targetTag.id]} - <DistanceBetweenTags from={fireteamTag} to={targetTag}/>
    </a>;

const ClearTargetButton = ({fireteam, onSetTargetTag}) =>
    <a className="btn btn-block btn-default" onClick={() => onSetTargetTag(fireteam, null)}>
        Wyczyść cel
    </a>;

const mapStateToProps = (state, ownProps) => ({
    tagDescriptionsByTagId: tagDescriptionsByTagId(state.tags.items, state.artifacts.items, state.fireteams.items),
    fireteamTag: state.tags.itemsById[ownProps.fireteam.tagId],
    targetTag: ownProps.fireteam.targetTagId ? state.tags.itemsById[ownProps.fireteam.targetTagId] : null
});

const mapDispatchToProps = (dispatch) => ({
    onSetTargetTag: (fireteam, targetTag) => dispatch(fireteamActions.setFireteamTargetTag(fireteam, targetTag))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveFireteam);