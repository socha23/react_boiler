import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import fetch from 'isomorphic-fetch'

import growl from '../common/growl'
import restActions from '../common/crud/crudActions'
import contextPath from '../common/contextPath'


import Popup from "../common/components/Popup";

const REGIONS = ["DOLNOŚLĄSKIE", "KUJAWSKO-POMORSKIE", "LUBELSKIE", "LUBUSKIE", "ŁÓDZKIE",
                "MAŁOPOLSKIE", "MAZOWIECKIE", "OPOLSKIE", "PODKARPACKIE", "PODLASKIE", "POMORSKIE",
                "ŚLĄSKIE", "ŚWIĘTOKRZYSKIE", "WARMINSKO-MAZURSKIE", "WIELKOPOLSKIE", "ZACHODNIOPOMORSKIE"];
const APPS = ["MUZEALNIK", "KDR", "ROTA"];


class ImportExerciseButton extends React.Component {


    state = {
        textToImport: "",
        app: APPS[0],
        region: REGIONS[0],
        totalTime: 0,
        errors: []
    };

    onSave = () => {
        let obj = {};
        try {
            obj = JSON.parse(this.state.textToImport);
        } catch (e) {
            this.setState({errors: ["Nieprawidłowy JSON"]});
            return
        }
        
        obj.app = this.state.app;
        obj.region = this.state.region;
        obj.totalTime = this.state.totalTime;
        this.props.onSave(obj, this.afterSave);
    };

    afterSave = (result) => {
        if (result.success) {
            this.popup.closeModal();
            this.setState({textToImport: "", app: APPS[0], region: REGIONS[0], totalTime: 0, errors: []});
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
                        Czas wykonania ćwiczenia (w sekundach)
                    </label>
                    <input type="number" className="form-control"  value={this.state.totalTime} onChange={e => {this.setState({totalTime: e.target.value})}}/>
                </div>
                <div className={"form-group"}>
                    <label>
                        Aplikacja
                    </label>
                    <select className="form-control"  value={this.state.app} onChange={e => {this.setState({app: e.target.value})}}>
                        {APPS.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>
                <div className={"form-group"}>
                    <label>
                        Województwo
                    </label>
                    <select className="form-control" value={this.state.region} onChange={e => {this.setState({region: e.target.value})}}>
                        {REGIONS.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>

                <div className={"form-group"}>
                    <label>
                        JSON z treścią ćwiczenia
                    </label>
                    <textarea rows={10} className="form-control" value={this.state.textToImport} onChange={e => {this.setState({textToImport: e.target.value})}}/>
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
    onSave: (obj, onSuccess = () => {}, onError = () => {}) => {
        fetch(contextPath() + "/api/importExercise", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(obj)
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
