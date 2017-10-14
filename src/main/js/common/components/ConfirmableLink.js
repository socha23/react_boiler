import React from 'react'
import PropTypes from 'prop-types'


export default class ConfirmableLink extends React.Component {

    static propTypes = {
        onClick: PropTypes.func,
        message: PropTypes.string
    };

    static defaultProps = {
        message: "Are you sure?"
    };

    onClick = () => {
        if (confirm(this.props.message)) {
            this.props.onClick();
        }
    };

    render() {
        let myProps = {...this.props};
        delete myProps.message;
        return <a {...myProps} onClick={this.onClick}>{this.props.children}</a>
    }
};



