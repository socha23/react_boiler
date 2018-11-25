import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import fetch from 'isomorphic-fetch'

import growl from '../common/growl'
import restActions from '../common/crud/crudActions'
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
        this.props.onSave(textToImport, this.afterSave);
    };

    afterSave = (result) => {
        if (result.success) {
            this.popup.closeModal();
            this.setState({textToImport: "", errors: []});
            this.props.history.push("/exercises/" + result.item.id);
            growl("Zaimportowano ćwiczenie");

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

const pocExerciseActions = restActions("pocExercise");

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    onSave: (jsonText, onSuccess = () => {}, onError = () => {}) => {
        fetch(contextPath() + "/api/importExercise", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: jsonText
        })
            .then(resp => resp.status < 300
                ? resp.json().then(item => {
                    dispatch(pocExerciseActions.createItemSuccess(item));
                    onSuccess(item);

                })
                : onError(resp)
            )
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImportExerciseButton));
