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
        onSelectTagOnMap = () => {
        }
        }) => <div style={{display: "flex", alignItems: "center", minHeight: 84}}>
    <div style={{marginRight: 10, fontSize: 40}}>
        <PanMapButton onClick={onSelectTagOnMap}/>
    </div>

    <div style={{flex: 1}}>
        <div style={{display: "flex"}}>


            <div style={{flex: 1}}>
                <span style={{fontWeight: "bold", fontSize: 20, marginRight: 15}}>
                    {fireteam.name}
                </span>
                <TagAreaName tag={fireteamTag}/>
            </div>
            <div style={{fontSize: 20}}>
                <DistanceBetweenTags from={fireteamTag} to={targetTag}/>
            </div>
        </div>
        <div style={{marginTop: 10}}>
            <FireteamTarget fireteamTag={fireteamTag} targetTag={targetTag} tagDescriptionsByTagId={tagDescriptionsByTagId}/>
        </div>
    </div>
</div>;

const FireteamTarget = ({fireteamTag, targetTag, tagDescriptionsByTagId = {}}) =>
                targetTag ?
                        <span style={{fontSize: 20}}>
                            {tagDescriptionsByTagId[targetTag.id]}
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