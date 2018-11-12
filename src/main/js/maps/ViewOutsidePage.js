import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import LocatorObjectsList from '../tags/LocatorObjectsList'
import HeightExpander from "../common/components/HeightExpander";
import {crudActions} from "../common/crud/crudContainers"

import Panel from '../common/components/Panel'
import GoogleMap from './GoogleMap'
import PinModeWarning from "../common/components/PinModeWarning";

const ViewOutside  = ({locators, selectedLocator, onSelectLocator, pinMode, onPinModeClickMap, onEnterPinMode, onUnpinLocator, children}) =>
    <HeightExpander>
        <div style={{height: "100%", display: "flex"}}>
            <div style={{width: "30%", marginLeft: 5, marginRight: 5, height: "100%", overflowY: "auto"}}>
                <Panel style={{display: "flex", flexDirection: "column"}}>
                    <div style={{flexGrow: 1}}>
                        <LocatorObjectsList locators={locators} selected={selectedLocator} onSelect={onSelectLocator}
                                            onEnterPinMode={onEnterPinMode}
                                            onUnpinLocator={onUnpinLocator}
                        />
                    </div>
                </Panel>
            </div>
            <div style={{position: "relative", flexGrow: 1, height: "100%", border: "1px solid #ddd", borderRadius: 4, marginLeft: 5, marginRight: 5}}>
                <div style={{position: "absolute", zIndex: 2, width: "100%"}}>
                {children}
                </div>

                <GoogleMap locators={locators} selected={selectedLocator} onClick={onSelectLocator} onClickMap={onPinModeClickMap}/>
            </div>
        </div>

    </HeightExpander>;

class ViewOutsideWithPinning extends React.Component {
    state = {
        pinMode: false,
        locatorBeingPinned: null
    };

    onPinLocator = (pos) => {
        if (!this.state.pinMode) {
            return;
        }
        let locator = this.state.locatorBeingPinned;
        if (locator) {
            locator.pinned = {latitude: pos.lat, longitude: pos.lng};
            locator.location = {latitude: pos.lat, longitude: pos.lng};
            this.props.onUpdate(locator)
        }
        this.onCancelPinMode();
    };

    onUnpinLocator = (locator) => {
        locator.pinned = null;
        this.props.onUpdate(locator)
    };

    onCancelPinMode = () => {
        this.setState({
            pinMode: false,
            locatorBeingPinned: null
        })
    };

    onEnterPinMode = (locator) => {
        this.setState({
            pinMode: true,
            locatorBeingPinned: {...locator}
        })
    };

    render = () => {
        return <ViewOutside {...this.props}
                            pinMode={this.state.pinMode}
                            onPinModeClickMap={this.onPinLocator}
                            onEnterPinMode={this.onEnterPinMode}
                            onUnpinLocator={this.onUnpinLocator}
        >
            {
                this.state.pinMode ?
                    <PinModeWarning name={this.state.locatorBeingPinned.name} onCancel={this.onCancelPinMode}/>
                    : <span/>
            }
        </ViewOutside>
    }
}

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

export default withRouter(connect(mapStateToProps)(crudActions("locators", ViewOutsideWithPinning)));
