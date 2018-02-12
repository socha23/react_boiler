import React from 'react'

import Fullscreen from '../../common/components/Fullscreen'

import Map from './Map'
import TargetBar from './TargetBar'
import TargetDistance from './TargetDistance'

const FireteamApp = ({fireteam}) => {

    return <Fullscreen style={{display: "flex", flexDirection: "column"}}>
        <Map fireteam={fireteam}/>
        <TargetDistance fireteam={fireteam}/>
        <TargetBar fireteam={fireteam}/>
    </Fullscreen>
};

export default FireteamApp;
