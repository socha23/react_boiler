import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {crudCreate, CrudForm} from '../common/crud/crudContainers'

class ArtifactForm extends CrudForm {

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
    CreateArtifactForm: crudCreate("artifacts", ArtifactForm, {name: '', weight: 0})

};

