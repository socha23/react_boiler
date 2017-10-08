import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class FormHelper extends React.Component {
    componentWillMount = () => {
        if (this.resetForm) {
            this.resetForm();
        }
    };

    componentWillUpdate = (nextProps, nextState) => {
        if (!this.props.submitSuccess && nextProps.submitSuccess) {
            if (this.props.resetAfterSubmitSuccess && this.resetForm) {
                this.resetForm();
            }
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
    resetAfterSubmitSuccess: PropTypes.bool,
    onSubmit: PropTypes.func
};

FormHelper.defaultProps = {
    isSubmitting: false,
    submitSuccess: false,
    resetAfterSubmitSuccess: false,
    onSubmit: () => {}
};
