import React from 'react'
import PropTypes from 'prop-types'
import FormHelper from '../common/components/FormHelper'
import {crudCreate} from '../common/crud/crudContainers'
import {floatToString, stringToFloat} from '../common/conversionHelpers'
import {Priority, Type} from './ArtifactVocs'
import Uploader from '../common/components/Uploader'
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

            <div className="form-horizontal">
                <div className={this.formGroupClassName('name')}>
                    <label htmlFor="artifactName" className="col-sm-2 control-label">Nazwa:</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.stateSettingListener("name")}
                            className="form-control"
                            id="artifactName"
                            placeholder="Wprowadź nazwę"/>
                    </div>
                </div>

                <div className={this.formGroupClassName('type')}>
                    <label htmlFor="artifactType" className="col-sm-2 control-label">Typ:</label>
                    <div className="col-sm-10">
                        <select
                            value={this.state.type}
                            onChange={this.stateSettingListener("type")}
                            className="form-control"
                            id="artifactType"
                        >
                            {Type.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className={this.formGroupClassName('priority')}>
                    <label htmlFor="artifactPriority" className="col-sm-2 control-label">Priorytet:</label>
                    <div className="col-sm-10">
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

                <hr/>

                <div className={this.formGroupClassName('weight')}>
                    <label htmlFor="artifactWeight" className="col-sm-2 control-label">Waga:</label>
                    <div className="col-sm-10">
                        <input
                                type="number"
                            value={this.state.weight}
                            onChange={this.stateSettingListener("weight")}
                            className="form-control"
                            id="artifactWeight"
                            placeholder="Wprowadź wagę w kg"
                        />
                    </div>
                </div>

                <div className={this.formGroupClassName('width') + this.formGroupClassName('height') + this.formGroupClassName('depth')}>
                    <label htmlFor="artifactDimensions" className="col-sm-2 control-label">Rozmiar:</label>
                    <div className="col-sm-10 form-inline">
                        <input
                            type="number"
                            value={this.state.width}
                            onChange={this.stateSettingListener("width")}
                            className="form-control"
                            style={{width: 100}}
                            id="artifactWidth"
                            placeholder="Szer. cm"
                        />
                        <input
                            type="number"
                            value={this.state.height}
                            onChange={this.stateSettingListener("height")}
                            className="form-control"
                            style={{width: 100}}
                            id="artifactHeight"
                            placeholder="Wys. cm"
                        />
                        <input
                            type="number"
                            value={this.state.depth}
                            onChange={this.stateSettingListener("depth")}
                            className="form-control"
                            style={{width: 100}}
                            id="artifactDepth"
                            placeholder="Głęb. cm"
                        />
                    </div>
                </div>

            </div>

            <hr/>

            <div className={this.formGroupClassName('identificationNotes')}>
                <label htmlFor="artifactIdentificationNotes">Identyfikacja:</label>
                <textarea
                    value={this.state.identificationNotes}
                    onChange={this.stateSettingListener("identificationNotes")}
                    className="form-control"
                    id="artifactIdentificationNotes"
                    placeholder="Notatki dotyczące identyfikacji"
                />
            </div>

            <div className={this.formGroupClassName('evacuationNotes')}>
                <label htmlFor="artifactEvacuationNotes">Ewakuacja:</label>
                <textarea
                    value={this.state.evacuationNotes}
                    onChange={this.stateSettingListener("evacuationNotes")}
                    className="form-control"
                    id="artifactEvacuationNotes"
                    placeholder="Notatki dotyczące ewakuacji"
                />
            </div>

            <strong>Zdjęcia</strong>
            <Uploader/>


            <button type="submit"
                    className="btn btn-primary pull-right iconWithName"
                    disabled={!this.canSubmit()}
            >
                <i className="glyphicon glyphicon-ok"/>
                {this.props.submitText}
            </button>
        </form>
    }
}

export default ArtifactForm

