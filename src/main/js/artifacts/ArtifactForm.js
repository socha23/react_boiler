import React from 'react'
import PropTypes from 'prop-types'
import FormHelper from '../common/components/FormHelper'
import {crudCreate} from '../common/crud/crudContainers'
import {floatToString, stringToFloat} from '../common/conversionHelpers'
import {Priority, Type} from './ArtifactVocs'
import ErrorList from '../common/components/ErrorList'


class ArtifactForm extends FormHelper {

    resetForm = (item = {}) => {
        let dimensions = item.dimensions || {};

        this.setState({
            name: item.name || '',
            type: item.type || Type[0].id,
            priority: item.priority || Priority[0].id,
            weight: floatToString(item.weight) || '',
            width: floatToString(dimensions.width) || '',
            height: floatToString(dimensions.height) || '',
            depth: floatToString(dimensions.depth) || '',
            identificationNotes: item.identificationNotes || '',
            evacuationNotes: item.evacuationNotes || ''
        });
    };

    getItemToSubmit = () => {

        let item = {...this.props.item};

        item.name = this.state.name;
        item.type = this.state.type;
        item.priority = this.state.priority;
        item.weight = stringToFloat(this.state.weight);
        item.dimensions = {
            height: stringToFloat(this.state.height),
            width: stringToFloat(this.state.width),
            depth: stringToFloat(this.state.depth)
        };
        item.identificationNotes = this.state.identificationNotes;
        item.evacuationNotes = this.state.evacuationNotes;
        return item;
    };

    render() {
        return <form onSubmit={this.onSubmit}>
            <ErrorList errors={this.state.errors}/>

            <div className={this.formGroupClassName('name')}>
                <label htmlFor="artifactName">Name</label>
                <input
                    type="text"
                    value={this.state.name}
                    onChange={this.stateSettingListener("name")}
                    className="form-control"
                    id="artifactName"
                    placeholder="Please enter artifact name"/>
            </div>
            <div className="form-inline">
                <div className={this.formGroupClassName('type')}>
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
                <div className={this.formGroupClassName('priority')}>
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
                <div className={this.formGroupClassName('height')}>
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
                <div className={this.formGroupClassName('width')}>
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
                <div className={this.formGroupClassName('depth')}>
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


            <div className={this.formGroupClassName('weight')}>
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

            <div className={this.formGroupClassName('identificationNotes')}>
                <label htmlFor="artifactIdentificationNotes">Identification notes</label>
                <textarea
                    value={this.state.identificationNotes}
                    onChange={this.stateSettingListener("identificationNotes")}
                    className="form-control"
                    id="artifactIdentificationNotes"
                    placeholder="Enter identification notes here"
                />
            </div>

            <div className={this.formGroupClassName('evacuationNotes')}>
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

export default ArtifactForm

