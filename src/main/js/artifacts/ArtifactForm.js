import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FormHelper from '../common/components/FormHelper'
import {crudCreate} from '../common/crud/crudContainers'
import {floatToString, stringToFloat} from '../common/conversionHelpers'
import {Priority, Type} from './ArtifactVocs'


class ArtifactForm extends FormHelper {

    resetForm = () => {
        this.setState({
            name: this.props.item.name,
            type: this.props.item.type,
            priority: this.props.item.priority,
            weight: floatToString(this.props.item.weight),
            width: floatToString(this.props.item.width),
            height: floatToString(this.props.item.height),
            depth: floatToString(this.props.item.depth),
            identificationNotes: this.props.item.identificationNotes,
            evacuationNotes: this.props.item.evacuationNotes
        });
    };

    getItemToSubmit = () => ({
        name: this.state.name,
        type: this.state.type || null,
        priority: this.state.priority || null,
        weight: stringToFloat(this.state.weight),
        dimensions: {
            height: stringToFloat(this.state.height),
            width: stringToFloat(this.state.width),
            depth: stringToFloat(this.state.depth)
        },
        identificationNotes: this.state.identificationNotes,
        evacuationNotes: this.state.evacuationNotes
    });

    render() {
        return <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label htmlFor="artifactName">Name</label>
                <span>{this.props.fldErrors.name}</span>
                <input
                    type="text"
                    value={this.state.name}
                    onChange={this.stateSettingListener("name")}
                    className="form-control"
                    id="artifactName"
                    placeholder="Please enter artifact name"/>
            </div>
            <div className="form-inline">
                <div className="form-group">
                    <label htmlFor="artifactType">Type</label>
                    <select
                        value={this.state.type}
                        onChange={this.stateSettingListener("type")}
                        className="form-control"
                        id="artifactType"
                    >
                        {Type.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="artifactPriority">Priority</label>
                    <select
                        value={this.state.priority}
                        onChange={this.stateSettingListener("priority")}
                        className="form-control"
                        id="artifactPriority"
                    >
                        {Priority.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
            </div>

            <div className="form-inline">
                <div className="form-group">
                    <label htmlFor="artifactHeight">Height</label>
                    <input
                        type="number"
                        value={this.state.height}
                        onChange={this.stateSettingListener("height")}
                        className="form-control"
                        id="artifactHeight"
                        placeholder="Height (cm)"
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="artifactHeight">Width</label>
                    <input
                        type="number"
                        value={this.state.width}
                        onChange={this.stateSettingListener("width")}
                        className="form-control"
                        id="artifactWidth"
                        placeholder="Width (cm)"
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="artifactDepth">Depth</label>
                    <input
                        type="number"
                        value={this.state.depth}
                        onChange={this.stateSettingListener("depth")}
                        className="form-control"
                        id="artifactDepth"
                        placeholder="Depth (cm)"
                        />
                </div>
            </div>


            <div className="form-group">
                <label htmlFor="artifactWeight">Weight</label>
                <input
                    type="number"
                    value={this.state.weight}
                    onChange={this.stateSettingListener("weight")}
                    className="form-control"
                    id="artifactWeight"
                    placeholder="Please enter weight (kg)"
                />
            </div>

            <div className="form-group">
                <label htmlFor="artifactIdentificationNotes">Identification notes</label>
                <textarea
                    value={this.state.identificationNotes}
                    onChange={this.stateSettingListener("identificationNotes")}
                    className="form-control"
                    id="artifactIdentificationNotes"
                    placeholder="Enter identification notes here"
                />
            </div>

            <div className="form-group">
                <label htmlFor="artifactEvacuationNotes">Evacuation notes</label>
                <textarea
                    value={this.state.evacuationNotes}
                    onChange={this.stateSettingListener("evacuationNotes")}
                    className="form-control"
                    id="artifactEvacuationNotes"
                    placeholder="Enter evacuation notes here"
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
    CreateArtifactForm: crudCreate("artifacts", ArtifactForm, {
        name: '',
        type: Type[0].id,
        priority: Priority[0].id,
        weight: null,
        dimensions: {},
        identificationNotes: '',
        evacuationNotes: ''
    })

};

