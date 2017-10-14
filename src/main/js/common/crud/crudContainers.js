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

function crudList(resource, Component) {
    const actions = crudActions(resource);

    const mapStateToProps = (state) =>({
        items: state[resource].items || []
    });

    const mapDispatchToProps = (dispatch) => ({
        onMount: () => dispatch(actions.fetchItemsIfNeeded()),
        reloadItems: () => dispatch(actions.fetchItemsIfNeeded()),
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
        onCreate: (item) => dispatch(actions.createItem(item)),
        onDelete: (item, onSuccess) => dispatch(actions.deleteItem(item, onSuccess))
    });

    return connect(mapStateToProps, mapDispatchToProps)(Component);
}




module.exports = {
    crudList: crudList,
    crudActions: myCrudActions
};


