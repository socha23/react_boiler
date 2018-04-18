import React from 'react'
import {connect} from 'react-redux'

export function nothingReceivedReducer(state = {}, action) {
    if (action.type.startsWith("RECEIVE_ITEMS_")) {
        return {
            ...state,
            lastReceivedTimestamp: new Date()
        }
    } else {
        return state
    }
}

const lastReceivedTimestamp = state => state.lastReceivedTimestamp;
    
class IfNothingReceivedComponent extends React.Component {

    state = {visible: false};

    componentDidMount = () => {
        this.refreshTimer = setInterval(() => {
            const secondsSinceLast = (new Date() - this.props.lastReceivedTimestamp) / 1000;

            this.setState({visible: secondsSinceLast > this.props.secondsWithoutReceive})
        }, 1)
    };

    componentWillUnmount = () => {
        clearInterval(this.refreshTimer);
    };

    render = () => this.state.visible ? this.props.children : <span/>
}


export const IfNothingReceived = connect((state) => ({lastReceivedTimestamp: lastReceivedTimestamp(state)}))(IfNothingReceivedComponent);
