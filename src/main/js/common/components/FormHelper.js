import React from 'react'
import PropTypes from 'prop-types'
import growl from '../growl'

export default class FormHelper extends React.Component {

    state = {
        errors: [],
        fldErrors: {}
    };


    componentWillMount = () => {
        this.resetForm(this.props.item);
    };

    componentWillReceiveProps = (nextProps) => {
        this.resetForm(nextProps.item)
    };

    resetForm = (item) => {};

    stateSettingEventListener = (fld) => {
        return (ev) => {
            var newState = {};
            newState[fld] = ev.target.value;
            this.setState(newState);
        }
    };

    stateSettingValueListener = (fld) => {
        return (val) => {
            var newState = {};
            newState[fld] = val;
            this.setState(newState);
        }
    };

    getItemToSubmit = () => ({
    });

    onSubmitSuccess = (item) => {
        this.setState({
            errors: [],
            fldErrors: {}
        })
    };

    formGroupClassName = (field) => {
        let result = "form-group ";
        if (this.state.fldErrors[field]) {
            result += " has-error ";
        }
        return result;
    };

    onSubmitError = (errors) => {
        var fldErrors = {};
        var myErrors = [];
        console.log(errors);
        errors.forEach(e => {
            fldErrors[e.property] = e.message;
            myErrors.push(e.message);
        });

        this.setState({errors: myErrors, fldErrors: fldErrors})
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.props.onSubmit) {
            this.props.onSubmit(this.getItemToSubmit(), this.onSubmitSuccess, this.onSubmitError);
        }
    };



    canSubmit() {
        return !this.props.isSubmitting
    }
}

FormHelper.propTypes = {
    isSubmitting: PropTypes.bool,
    afterSubmit: PropTypes.object,
    onSubmit: PropTypes.func,
    fldErrors: PropTypes.object
};

FormHelper.defaultProps = {
    isSubmitting: false,
    onSubmit: () => {}
};

