import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import crudActions from './crudActions'
import AjaxSpinner from '../components/AjaxSpinner'

function runOnMount(Component) {
    return class extends React.Component {
        componentDidMount() {
            this.props.onMount()
        }

        render() {
            return <Component {...this.props}/>
        }
    }
}

function crudList(arg, Component) {
    let resource = "";
    let options = {};

    if (typeof arg === "string") {
        resource = arg;
    } else {
        resource = arg.resource;
        options = arg;
    }
    const actions = crudActions(resource);

    const mapStateToProps = (state) =>({
        items: state[resource].items || []
    });

    const mapDispatchToProps = (dispatch) => ({
        onMount: () => dispatch(actions.loadItems(options)),
        reloadItems: () => dispatch(actions.loadItems(options))
    });

    return connect(mapStateToProps, mapDispatchToProps)(runOnMount(Component));
}

function myCrudActions(resource,
                       Component) {
    const actions = crudActions(resource);

    const mapStateToProps = (state) =>({
        isSubmitting: state[resource].isCreating,
        submitSuccess: state[resource].createSuccess,
        fldErrors: state[resource].createFldErrors
    });

    const mapDispatchToProps = (dispatch) => ({
        onCreate: (item, onSuccess = () => {}, onError = () => {}) => dispatch(actions.createItem(item, onSuccess, onError)),
        onDelete: (item, onSuccess = () => {}) => dispatch(actions.deleteItem(item, onSuccess)),
        onUpdate: (item, onSuccess = () => {}, onError = () => {}) => dispatch(actions.updateItem(item, onSuccess, onError))
    });

    return connect(mapStateToProps, mapDispatchToProps)(Component);
}



class ResourceLoader extends React.Component {

    static defaultProps = {
        resources: [],
        interval: 0
    };

    componentDidMount = () => {
        this.props.loadResources();
        if (this.props.interval > 0) {
            this.intervalHandle = setInterval(() => {
                this.props.loadResources();
            }, this.props.interval);
        }
    };

    componentWillUnmount = () => {
        this.props.loadResources();
        if (this.intervalHandle) {
            this.intervalHandle();
            this.intervalHandle = null;
        }

    };

    render = () => {
        if (this.props.everythingLoaded) {
            return this.props.children
        } else {
            return <AjaxSpinner/>
        }
    };
}

const mapStateToProps = (state, ownProps) => {
    ownProps.resources.forEach(resource => {
        if (!ownProps[resource] || !ownProps[resource].itemsTimestamp) {
            return {everythingLoaded: false};
        }
    });
    return {everythingLoaded: true};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    loadResources: () => {
        ownProps.resources.forEach(resource => {
            dispatch(crudActions(resource).loadItems());
        });
    }
});

ResourceLoader = withRouter(connect(mapStateToProps, mapDispatchToProps)(ResourceLoader));


module.exports = {
    runOnMount: runOnMount,
    crudList: crudList,
    crudActions: myCrudActions,
    ResourceLoader: ResourceLoader
};


