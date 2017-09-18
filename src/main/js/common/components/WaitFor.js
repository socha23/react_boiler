import React, {Component, PropTypes} from 'react'
import AjaxSpinner from './AjaxSpinner'

const WaitFor = React.createClass({

    componentWillMount: function () {
        if (!this.props.target) {
            this.props.ifEmpty();
        }
    },

    getDefaultProps: function() {
        return {
            ifEmpty: () => {},
            spinnerDelay: 100
        }
    },

    getInitialState: function () {
        return {
            firstTime: true,
            waiting: false,
            waitDisplayed: this.props.target ? false : true
        }
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return !this.waitTimeoutHandle || nextState.waitDisplayed || nextProps.target;
    },

    componentWillReceiveProps: function (nextProps) {
        if (!nextProps.target) {
            if (this.state.firstTime) {
                this.setState({firstTime: false, waitDisplayed: true})
            } else {
                if (!this.state.waiting) {
                    this.setState({waiting: true});
                    this.waitTimeoutHandle = setTimeout(() => {
                        this.setState({waitDisplayed: true});
                        this.waitTimeoutHandle = null;
                    }, this.props.spinnerDelay);
                }

            }
        } else {
            if (this.waitTimeoutHandle) {
                clearTimeout(this.waitTimeoutHandle);
                this.waitTimeoutHandle = null;
            }
            this.setState({
                firstTime:false,
                waiting: false,
                waitDisplayed: false
            })
        }
    },

    render: function() {
        if (this.state.waitDisplayed) {
            return <AjaxSpinner/>
        } else {
            return <div>
                {this.props.children}
            </div>
        }
    }

});

export default WaitFor;