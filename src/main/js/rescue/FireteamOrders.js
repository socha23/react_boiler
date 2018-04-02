import React from 'react'
import {connect} from 'react-redux'

import DistanceBetweenTags from '../tags/DistanceBetweenTags'

import {getFireteamTag} from '../fireteams/selectors'

import * as fireteamActions from '../fireteams/fireteamActions'

const FireteamOrders = ({
                            fireteam = {},
                            fireteamTag = {},
                            targetTag = {},
                            onSetTargetTag = () => {
                            }
                        }) => <div>
    {
        fireteam ?
            <ClearTargetButton fireteam={fireteam} onSetTargetTag={onSetTargetTag}/>
            : <span/>

    }
    {

        fireteam && targetTag ?
            <SetTargetButton fireteam={fireteam} fireteamTag={fireteamTag}
                             targetTag={targetTag}
                             disabled={fireteam.tagId == targetTag.id || fireteam.targetTagId == targetTag.id}
                             onSetTargetTag={onSetTargetTag}/>
            : <span/>
    }
</div>;


const SetTargetButton = ({fireteam, fireteamTag, targetTag, onSetTargetTag, disabled}) =>
    <button
        className={"btn btn-block btn-lg " + (disabled ? "" : "pulseGlowGreen")}
        style={{backgroundColor: "#006600", color: "white"}}
        onClick={() => onSetTargetTag(fireteam, targetTag)}
    >
        <div style={{display: "flex", minHeight: 84, alignItems: 'center', textAlign: 'left'}}>
            <div style={{marginRight: 20, fontSize: 40, paddingTop: 10}}>
                <i className="glyphicon glyphicon-screenshot"/>
            </div>
            <div style={{flex: 1}}>
                Ustaw cel {fireteam.name}:<br/> {targetTag.label}
            </div>
            <div>
                <DistanceBetweenTags from={fireteamTag} to={targetTag} wrongFloorLabel=""/>
            </div>
        </div>


    </button>;

const ClearTargetButton = ({fireteam, onSetTargetTag}) =>
    <a className="btn btn-block btn-default btn-lg btn-danger" onClick={() => onSetTargetTag(fireteam, null)}>
        Wyczyść cel
    </a>;

const mapStateToProps = (state, ownProps) => ({
    fireteamTag: getFireteamTag(state, ownProps.fireteam)
});

const mapDispatchToProps = (dispatch) => ({
    onSetTargetTag: (fireteam, targetTag) => dispatch(fireteamActions.setFireteamTargetTag(fireteam, targetTag))
});

export default connect(mapStateToProps, mapDispatchToProps)(FireteamOrders);