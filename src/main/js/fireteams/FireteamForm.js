import React from 'react'

import FormHelper from '../common/components/FormHelper'
import ErrorList from '../common/components/ErrorList'

import AvailableTagsDropDown from '../tags/AvailableTagsDropDown'


class FireteamForm extends FormHelper {

    resetForm = (item = {}) => {
        let dimensions = item.dimensions || {};

        this.setState({
            name: item.name || '',
            tagId: item.tagId
        });
    };

    getItemToSubmit = () => {

        let item = {...this.props.item};

        item.name = this.state.name;
        item.tagId = this.state.tagId;
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
                            onChange={this.stateSettingEventListener("name")}
                            className="form-control"
                            id="artifactName"
                            placeholder="Wprowadź nazwę"/>
                    </div>
                </div>

                <div className={this.formGroupClassName('tagId')}>
                    <label htmlFor="artifactTagId" className="col-sm-2 control-label">Znacznik:</label>
                    <div className="col-sm-10">
                        <AvailableTagsDropDown
                            value={this.state.tagId}
                            onChange={this.stateSettingValueListener("tagId")}
                            id="artifactTagId"
                            forArtifact={this.props.item}
                        />
                    </div>
                </div>

            </div>

            <div className="buttonRow" style={{textAlign: "right"}}>
                    <button type="submit"
                            className="btn btn-primary iconWithName"
                            disabled={!this.canSubmit()}
                    >
                        <i className="glyphicon glyphicon-ok"/>
                        {this.props.labelPopupOk}
                    </button>
            </div>

        </form>
    }
}

export default FireteamForm
