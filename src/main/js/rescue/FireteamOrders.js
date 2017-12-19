import React from 'react'
import {connect} from 'react-redux'

import Panel from '../common/components/Panel'

import {tagDescriptionsByTagId} from '../tags/tagHelpers'
import DistanceBetweenTags from '../tags/DistanceBetweenTags'
import * as fireteamActions from '../fireteams/fireteamActions'

const FireteamOrders = ({
        fireteam = {},
        fireteamTag = {},
        targetTag = {},
        tagDescriptionsByTagId = {},
        onSetTargetTag = () => {
        }
        }) => <Panel>
    <div style={{minHeight: 100}}>
        {

            fireteam && targetTag && fireteam.id != targetTag.id ?
                    <SetTargetButton fireteam={fireteam} fireteamTag={fireteamTag}
                                     targetTag={targetTag}
                                     tagDescriptionsByTagId={tagDescriptionsByTagId}
                                     onSetTargetTag={onSetTargetTag}/>
                    : <span/>}
    </div>
</Panel>;

const SetTargetButton = ({fireteam, fireteamTag, targetTag, tagDescriptionsByTagId, onSetTargetTag}) =>
        <a className="btn btn-block btn-primary btn-lg" onClick={() => onSetTargetTag(fireteam, targetTag)}>
            <div style={{display: "flex", minHeight: 80, alignItems: 'center'}}>
                <div style={{flex: 1, textAlign: 'left'}}>
                    <i className="glyphicon glyphicon-screenshot" style={{marginRight: 10}}/>
                    {fireteam.name}: {tagDescriptionsByTagId[targetTag.id]}
                </div>
                <div>
                    <DistanceBetweenTags from={fireteamTag} to={targetTag}/>
                </div>
            </div>


        </a>;

const ClearTargetButton = ({fireteam, onSetTargetTag}) =>
        <a className="btn btn-block btn-default" onClick={() => onSetTargetTag(fireteam, null)}>
            Wyczyść cel
        </a>;

const mapStateToProps = (state, ownProps) => ({
    tagDescriptionsByTagId: tagDescriptionsByTagId(state.tags.items, state.artifacts.items, state.fireteams.items),
    fireteamTag: ownProps.fireteam && ownProps.fireteam.id ? state.tags.itemsById[ownProps.fireteam.tagId] : null
});

const mapDispatchToProps = (dispatch) => ({
    onSetTargetTag: (fireteam, targetTag) => dispatch(fireteamActions.setFireteamTargetTag(fireteam, targetTag))
});

export default connect(mapStateToProps, mapDispatchToProps)(FireteamOrders);