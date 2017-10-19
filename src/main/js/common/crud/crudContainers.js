import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import crudActions from './crudActions'

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

function myCrudActions(
    resource,
    Component
) {
    const actions = crudActions(resource);

    const mapStateToProps = (state) =>({
        isSubmitting: state[resource].isCreating,
        submitSuccess: state[resource].createSuccess,
        fldErrors: state[resource].createFldErrors
    });

    const mapDispatchToProps = (dispatch) => ({
        onCreate: (item, onSuccess, onError) => dispatch(actions.createItem(item, onSuccess, onError)),
        onDelete: (item, onSuccess) => dispatch(actions.deleteItem(item, onSuccess)),
        onUpdate: (item, onSuccess, onError) => dispatch(actions.updateItem(item, onSuccess, onError))
    });

    return connect(mapStateToProps, mapDispatchToProps)(Component);
}




module.exports = {
    runOnMount: runOnMount,
    crudList: crudList,
    crudActions: myCrudActions
};


