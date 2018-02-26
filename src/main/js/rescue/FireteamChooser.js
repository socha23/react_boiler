import React from 'react'
import {connect} from 'react-redux'

import Panel from '../common/components/Panel'

import ActiveFireteam from './ActiveFireteam.js'

export const FireteamChooser = ({
        fireteams = [],
        selected = null,
        onSelect = () => {},
        tagsById = {}
        }) =>
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "-5px -5px 0 -5px"}}>
            {fireteams.map(f => {
                        let isSelected = selected && selected.id == f.id;
                        return <div style={{flex: 1, margin: 5}} key={f.id}>
                            <Panel
                                    style={{
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
        </div>;

const mapStateToProps = (state) => ({
    tagsById: state.tags.itemsById
});

export default connect(mapStateToProps)(FireteamChooser);