import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FormHelper from '../common/components/FormHelper'
import {crudCreate} from '../common/crud/crudContainers'


class ArtifactForm extends FormHelper {

    onChangeName = (ev) => {
        this.setState({name: ev.target.value});
    };

    onChangeWeight = (ev) => {
        this.setState({
            weightStr: ev.target.value,
            weight: parseFloat(ev.target.value)
        });
    };

    resetForm = () => {
        this.setState({
            weight: this.props.item.weight,
            weightStr: '',
            name: this.props.item.name
        });
    };

    getItemToSubmit = () => ({
        weight: this.state.weight,
        name: this.state.name
    });

    render() {
        return <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label htmlFor="artifactName">Name</label>
                <span>{this.props.errors.name}</span>
                <input
                    type="text"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    className="form-control"
                    id="artifactName"
                    placeholder="Please enter artifact name"/>
            </div>

            <div className="form-group">
                <label htmlFor="artifactWeight">Weight</label>
                <input
                    type="number"
                    value={this.state.weightStr}
                    onChange={this.onChangeWeight}
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
    CreateArtifactForm: crudCreate("artifacts", ArtifactForm, {name: '', weight: 0})

};

