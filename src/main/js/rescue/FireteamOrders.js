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
        }) => {

        if (fireteam && targetTag) {
            console.log("fti", fireteam.tagId, "ftti", fireteam.targetTagId,  "tti",targetTag.id);
        }
        return <div>
            {

                fireteam && targetTag ?
                        <SetTargetButton fireteam={fireteam} fireteamTag={fireteamTag}
                                         targetTag={targetTag}
                                         disabled={fireteam.tagId == targetTag.id || fireteam.targetTagId == targetTag.id}
                                         tagDescriptionsByTagId={tagDescriptionsByTagId}
                                         onSetTargetTag={onSetTargetTag}/>
                        : <span/>}
        </div>};


const SetTargetButton = ({fireteam, fireteamTag, targetTag, tagDescriptionsByTagId, onSetTargetTag, disabled}) =>
        <button
                className="btn btn-block btn-lg"
                style={{backgroundColor: "#006600", color: "white"}}
                disabled={disabled}
                onClick={() => onSetTargetTag(fireteam, targetTag)}
                >
            <div style={{display: "flex", minHeight: 84, alignItems: 'center', textAlign: 'left'}}>
                <div style={{marginRight: 20, fontSize: 40, paddingTop: 10}}>
                    <i className="glyphicon glyphicon-screenshot"/>
                </div>
                <div style={{flex: 1}}>
                    Ustaw cel {fireteam.name}:<br/> {tagDescriptionsByTagId[targetTag.id]}
                </div>
                <div>
                    <DistanceBetweenTags from={fireteamTag} to={targetTag}/>
                </div>
            </div>


        </button>;

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