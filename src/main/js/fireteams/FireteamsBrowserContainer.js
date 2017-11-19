import React from 'react'
import {crudList, crudActions} from '../common/crud/crudContainers'
import FireteamsBrowser from './FireteamsBrowser'

export default crudActions("fireteams",
    crudList("fireteams", FireteamsBrowser)
);