import React from 'react'
import {crudActions} from '../common/crud/crudContainers'
import FireteamsBrowser from './FireteamsBrowser'

import {connect} from 'react-redux'
import {getSortedFireteams} from "../fireteams/selectors";

const mapStateToProps = (state) => ({
    items: getSortedFireteams(state)
});

export default crudActions("fireteams",
    connect(mapStateToProps)(FireteamsBrowser));
