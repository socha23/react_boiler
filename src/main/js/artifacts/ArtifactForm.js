import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {crudCreate} from '../common/crud/crudContainers'

class FormHelper extends React.Component {
    state = {
        isSubmitting: false
    };

    componentWillMount = () => {
        this.setState({fields: this.itemToFields(this.props.item)});
    };

    changeField = fld => {
        return e => {
            var newFields = {...this.state.fields};
            newFields[fld] = e.target.value;
            this.setState({fields: newFields})
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

FormHelper.propTypes = {
    isSubmitting: PropTypes.bool,
    item: PropTypes.object,
    submitText: PropTypes.string,
    onSubmit: PropTypes.func
};

FormHelper.defaultProps = {
    isSubmitting: false,
    submitText: "Submit",
    item: {},
    onSubmit: () => {
    }
};



class ArtifactForm extends FormHelper {

    itemToFields = item => ({
        ...item,
        weight: '' + item.weight

    });

    fieldsToItem = fields => ({
        ...fields,
        weight: parseFloat(fields.weight)
    });

    render() {
        return <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label htmlFor="artifactName">Name</label>
                <input
                    type="text"
                    value={this.state.fields.name}
                    onChange={this.changeField("name")}
                    className="form-control"
                    id="artifactName"
                    placeholder="Please enter artifact name"/>
            </div>

            <div className="form-group">
                <label htmlFor="artifactWeight">Weight</label>
                <input
                    type="number"
                    value={this.state.fields.weight}
                    onChange={this.changeField("weight")}
                    className="form-control"
                    id="artifactWeight"
                    placeholder="Please enter weight (kg)"
                />
            </div>

            <button type="submit"
                    className="btn btn-primary"
                    disabled={!this.canSubmit()}
            >{this.props.submitText}</button>
        </form>
    }
}

module.exports = {
    ArtifactForm : ArtifactForm,
    CreateArtifactForm: crudCreate("artifacts", ArtifactForm)

};

