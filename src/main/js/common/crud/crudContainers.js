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
        reloadItems: () => dispatch(actions.fetchItemsIfNeeded())
    });

    return connect(mapStateToProps, mapDispatchToProps)(runOnMount(Component));
}



class CrudForm extends React.Component {
    state = {
        isSubmitting: false
    };

    componentWillMount = () => {
        this.resetForm();
    };

    resetForm = () => {
        this.setState({fields: this.itemToFields(this.props.item)});
    };

    changeField = fld => {
        return e => {
            var newFields = {...this.state.fields};
            newFields[fld] = e.target.value;
            this.setState({fields: newFields})
        }
    };

    componentWillUpdate = (nextProps, nextState) => {
        if (!this.props.submitSuccess && nextProps.submitSuccess && this.props.resetAfterSubmitSuccess) {
            this.resetForm();
        }
    };

    onSubmit = e => {
        e.preventDefault();
        var item = this.fieldsToItem(this.state.fields);

        if (this.props.onSubmit) {
            this.props.onSubmit(item);
        }
        return false;
    };

    canSubmit() {
        return !this.props.isSubmitting
    }

    itemToFields = item => ({
        ...item
    });

    fieldsToItem = fields => ({
        ...fields
    });
}

CrudForm.propTypes = {
    isSubmitting: PropTypes.bool,
    item: PropTypes.object,
    submitText: PropTypes.string,
    onSubmit: PropTypes.func
};

CrudForm.defaultProps = {
    isSubmitting: false,
    submitText: "Submit",
    item: {},
    onSubmit: () => {
    }
};

function crudCreate(
    resource,
    Component,
    item = {}
) {
    const actions = crudActions(resource);

    const mapStateToProps = (state) =>({
        isSubmitting: state[resource].isCreating,
        submitSuccess: state[resource].createSuccess,
        resetAfterSubmitSuccess: true,
        item: item
    });

    const mapDispatchToProps = (dispatch) => ({
        onSubmit: (item) => dispatch(actions.createItem(item))
    });

    return connect(mapStateToProps, mapDispatchToProps)(Component);
}


module.exports = {
    crudList: crudList,
    CrudForm: CrudForm,
    crudCreate: crudCreate

};