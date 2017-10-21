import React from 'react'
import {PropTypes} from 'prop-types'
import FloorPlan from './ZoomableFloorPlan'
import {Panel, PanelWithTitle} from '../common/components/Panel'

const ViewMapPage  = ({map}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-6 colWithSmallerGutter">
                { map ?
                    <Panel>
                        <FloorPlan map={map}/>
                    </Panel>
                    : <span/>
                }
            </div>
        </div>
    </div>;



export default ViewMapPage