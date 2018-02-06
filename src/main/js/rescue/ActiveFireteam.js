import React from 'react'
import {connect} from 'react-redux'

import Panel from '../common/components/Panel'

import TagAreaName from '../tags/TagAreaName'
import DistanceBetweenTags from '../tags/DistanceBetweenTags'

import {getFireteamTag, getTargetTag} from '../fireteams/selectors'

const ActiveFireteam = ({
        fireteam,
        fireteamTag,
        targetTag
        }) => <div style={{display: "flex", alignItems: "center", minHeight: 84}}>
    <div style={{flex: 1}}>
        <div style={{display: "flex"}}>


            <div style={{flex: 1}}>
                <span style={{fontWeight: "bold", fontSize: 20, marginRight: 10}}>
                    {fireteam.name}
                </span>
                <TagAreaName tag={fireteamTag} style={{fontSize: 16}}/>
            </div>
            <div style={{fontSize: 20}}>
                <DistanceBetweenTags from={fireteamTag} to={targetTag}/>
            </div>
        </div>
        <div style={{marginTop: 10}}>
            <FireteamTarget fireteamTag={fireteamTag} targetTag={targetTag}/>
            <TagAreaName tag={targetTag}/>
        </div>
    </div>
</div>;

const FireteamTarget = ({fireteamTag, targetTag}) =>
                targetTag ?
                        <span style={{fontSize: 20, marginRight: 10}}>
                            {targetTag.label}
                        </span>

                        :
                        <span>Nie ustawiono celu</span>
        ;

const mapStateToProps = (state, ownProps) => ({
    fireteamTag: getFireteamTag(state, ownProps.fireteam),
    targetTag: getTargetTag(state, ownProps.fireteam)
});

export default connect(mapStateToProps)(ActiveFireteam);