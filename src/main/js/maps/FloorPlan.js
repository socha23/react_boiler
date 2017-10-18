import React from 'react'
import {PropTypes} from 'prop-types'
import {crudList, crudActions} from '../common/crud/crudContainers'
import {MapList} from './MapList'
import {Panel, PanelWithTitle} from '../common/components/Panel'

const FloorPlan = ({map}) =>
        <img style={{width: "100%"}}
             src={map.base64content}
             title={map.name}/>;

export default FloorPlan