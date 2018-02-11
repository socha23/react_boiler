import React from 'react'

import Fullscreen from '../../common/components/Fullscreen'

import Map from './Map'
import TargetBar from './TargetBar'
import TargetDistance from './TargetDistance'

const FireteamApp = ({fireteam}) => <Fullscreen style={{display: "flex", flexDirection: "column"}}>
    <div style={{height: "100%", position: "relative"}}>
        <TargetDistance fireteam={fireteam}/>
        <Map fireteam={fireteam}/>
    </div>
    <TargetBar fireteam={fireteam}/>

</Fullscreen>;

export default FireteamApp;
