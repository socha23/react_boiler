import React from 'react'
import {connect} from 'react-redux'

import Panel from '../common/components/Panel'

import ActiveFireteam from './ActiveFireteam.js'


const OptionalScroll = ({fireteams = [], children}) => fireteams.length <= 2 ? children :
    <div className="scrollPanel" style={{
        height: 114,
        overflowX: "auto",
        overflowY: "hidden"
    }}>
        {children}
    </div>;


export const FireteamChooser = ({
                                    fireteams = [],
                                    selected = null,
                                    onSelect = () => {},
                                    tagsById = {}
                                }) =>
    <OptionalScroll fireteams={fireteams}>
        <div style={{display: "flex", flexDirection: "row", margin: "-5px -5px 0 -5px"}}>
            {fireteams.map(f => {
                    let isSelected = selected && selected.id == f.id;
                    return <div style={{flex: 1, margin: 5}} key={f.id}>
                        <Panel
                            style={{
                                minWidth: 250,
                                backgroundColor: isSelected ? "#f2dede" : "#fff",
                                cursor: "pointer"
                            }}
                            onClick={() => onSelect(f)}
                        >
                            <ActiveFireteam fireteam={f}/>
                        </Panel>
                    </div>
                }
            )}
        </div>
    </OptionalScroll>;

const mapStateToProps = (state) => ({
    tagsById: state.tags.itemsById
});

export default connect(mapStateToProps)(FireteamChooser);