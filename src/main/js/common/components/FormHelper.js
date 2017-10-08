import React, {Component} from 'react'
import PropTypes from 'prop-types'
import growl from '../growl'

export default class FormHelper extends React.Component {
    componentWillMount = () => {
        if (this.resetForm) {
            this.resetForm();
        }
    };

    componentWillUpdate = (nextProps, nextState) => {
        if (!this.props.submitSuccess && nextProps.submitSuccess) {
            if (this.props.afterSubmit.resetForm && this.resetForm) {
                this.resetForm();
            }
            if (this.props.afterSubmit.redirectTo) {
                this.context.router.history.push(this.props.afterSubmit.redirectTo);
            }
            if (this.props.afterSubmit.growl) {
                growl(this.props.afterSubmit.growl);
            }
        }
    };

    stateSettingListener = (fld) => {
        return (ev) => {
            var newState = {};
            newState[fld] = ev.target.value;
            this.setState(newState);
        }
    };

    getItemToSubmit = () => ({
    });

    onSubmit = e => {
        e.preventDefault();
        if (this.props.onSubmit) {
            this.props.onSubmit(this.getItemToSubmit());
        }
    };

    canSubmit() {
        return !this.props.isSubmitting
    }
}

FormHelper.propTypes = {
    isSubmitting: PropTypes.bool,
    submitSuccess: PropTypes.bool,
    submitError: PropTypes.bool,
    afterSubmit: PropTypes.object,
    onSubmit: PropTypes.func,
    fldErrors: PropTypes.object
};

FormHelper.defaultProps = {
    isSubmitting: false,
    submitSuccess: false,
    submitError: false,
    afterSubmit: {},
    fldErrors: {},
    onSubmit: () => {}
};

FormHelper.contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired
    })
};