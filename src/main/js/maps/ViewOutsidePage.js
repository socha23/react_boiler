import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import LocatorObjectsList from '../tags/LocatorObjectsList'
import HeightExpander from "../common/components/HeightExpander";

import Panel from '../common/components/Panel'
import GoogleMap from './GoogleMap'

const ViewOutside  = ({locators, selectedLocator, onSelectLocator}) =>
    <HeightExpander>
        <div style={{height: "100%", display: "flex"}}>
            <div style={{width: "30%", marginLeft: 5, marginRight: 5, height: "100%", overflowY: "auto"}}>
                <Panel style={{display: "flex", flexDirection: "column"}}>
                    <div style={{flexGrow: 1}}>
                        <LocatorObjectsList locators={locators} selected={selectedLocator} onSelect={onSelectLocator}/>
                    </div>
                </Panel>
            </div>
            <div style={{flexGrow: 1, height: "100%", border: "1px solid #ddd", borderRadius: 4, marginLeft: 5, marginRight: 5}}>
                <GoogleMap locators={locators} selected={selectedLocator} onClick={onSelectLocator}/>
            </div>
        </div>

    </HeightExpander>;

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
