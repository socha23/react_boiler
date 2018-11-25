import React from 'react'
import {connect} from 'react-redux'
import fetch from 'isomorphic-fetch'

import {growl} from '../common/growl'
import contextPath from '../common/contextPath'


import Popup from "../common/components/Popup";

class ImportExerciseButton extends React.Component {

    state = {
        textToImport: "",
        errors: []
    };

    onChangeTextToImport = (e) => {
        this.setState({textToImport: e.target.value});
    };

    onSave = () => {
        const textToImport = this.state.textToImport;
        console.log("Saving", textToImport);
        this.props.onSave(textToImport, this.afterSave);
    };

    afterSave = (result) => {
        console.log("after save", result);
        if (result.success) {
            this.popup.closeModal();
            this.setState({textToImport: "", errors: []});
        } else {
            this.setState({errors: result.errors})
        }
    };


    render = () =>
        <div>
            <a className="btn btn-primary" style={{cursor: "pointer"}} onClick={() => {this.popup.openModal()}}>

                <i className={"glyphicon glyphicon-plus"} style={{marginRight: 10}}/>
                Importuj ćwiczenie
            </a>
            <Popup
                labelPopupTitle={"Importuj ćwiczenie"}
                ref={r => {this.popup = r}}
            >
                <div>
                    {this.state.errors.map((e, idx) =>
                        <div className={"text-danger"} key={"error" + idx}>
                            {e}
                        </div>)}
                </div>

                <div className={"form-group"}>
                    <label>
                        Proszę wkleić JSON do zaimportowania:
                    </label>
                    <textarea rows={10} className="form-control" value={this.state.textToImport} onChange={this.onChangeTextToImport}/>
                </div>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <button className="btn btn-success" onClick={this.onSave}>
                        <i className={"glyphicon glphicon-ok"} style={{marginRight: 10}}/>
                        Importuj
                    </button>
                </div>

            </Popup>
        </div>
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    onSave: (jsonText, onSuccess = () => {}, onError = () => {}) => {
        fetch(contextPath() + "/api/importExercise", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: jsonText
        })
            .then(resp => resp.status < 300
                ? resp.json().then(item => onSuccess(item))
                : onError(resp)
            )
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportExerciseButton);
