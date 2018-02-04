import React from 'react'
import PropTypes from 'prop-types'

import Fullscreen from '../../common/components/Fullscreen'

import Map from './Map'
import StatusBar from './StatusBar'

const FireteamApp = ({fireteam}) =>
    <Fullscreen style={{display: "flex", flexDirection: "column"}}>
    <Map fireteam={fireteam}/>
    <StatusBar fireteam={fireteam}/>
</Fullscreen>;

export default FireteamApp;
