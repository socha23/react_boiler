import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import restActions from '../common/crud/crudActions'
import LocatorObjectsList from '../tags/LocatorObjectsList'

import Panel from '../common/components/Panel'
import GoogleMap from './GoogleMap'

const ViewOutside  = ({locators, selectedLocator, onSelectLocator}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-4 colWithSmallerGutter">
                <Panel>
                    <LocatorObjectsList locators={locators} selected={selectedLocator} onSelect={onSelectLocator}/>
                </Panel>
            </div>
            <div className="col-sm-8 colWithSmallerGutter">
                <Panel>
                    <GoogleMap locators={locators} selected={selectedLocator} onClick={onSelectLocator}/>
                </Panel>
            </div>
        </div>
    </div>;

const mapStateToProps = (state, ownProps) => {
    const myLocatorId = ownProps.locatorId;
    return {
        locators: state.locators.items,
        selectedLocator: myLocatorId ? state.locators.items.find((m) => m.id == myLocatorId) : null,
        onSelectLocator: (locator) => {
            ownProps.history.push("/maps/outside/" + locator.id)
        }
    }
};

export default withRouter(connect(mapStateToProps)(ViewOutside));
