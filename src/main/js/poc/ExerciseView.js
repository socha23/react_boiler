import React from 'react'
import moment from 'moment'

import ConfirmableLink from '../common/components/ConfirmableLink'

const ExerciseDetails = ({item, onDelete}) => <div>
        <div className="row">
            <div className="col-sm-10 form-group">
                <label>
                    Data i godzina:
                </label>
                <p className="form-control-static">
                    {moment(item.when).format("YYYY.MM.DD HH:mm")}
                </p>

            </div>
            <div className="col-sm-2">
                <ConfirmableLink className="btn btn-danger pull-right" onClick={() => onDelete(item)}
                                 title="Usuń"
                                 message={"Czy na pewno usunąć ćwiczenie?"}>
                    <i className="glyphicon glyphicon-remove"/> Usuń
                </ConfirmableLink>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12 form-group">
                <label>
                    Osoba biorąca udział w ćwiczeniu:
                </label>
                <p className="form-control-static">
                    {item.user}
                </p>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-12 form-group">
                <label>
                    Czas wykonania ćwiczenia:
                </label>
                <p className="form-control-static">
                    {item.totalTime} s
                </p>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-12 form-group">
                <label>
                    Aplikacja:
                </label>
                <p className="form-control-static">
                    {item.app}
                </p>
            </div>
        </div>

    <div className="row">
        <div className="col-sm-12 form-group">
            <label>
                Województwo:
            </label>
            <p className="form-control-static">
                {item.region}
            </p>
        </div>
    </div>

        <div className="row">
            <div className="col-sm-12">
                <table className="table table-hover table-pointer">
                    <thead>
                    <tr>
                        <th>Etap</th>
                        <th>Czas</th>
                        <th>Poprawny?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {item.stages.map((s, idx) => <tr key={"stage" + idx}>
                        <td><b>{s.name}</b> {s.briefing}</td>
                        <td>{s.timeTaken.toFixed(1)}s</td>
                        <td>{s.correctAnswer ?
                            <i className={"glyphicon glyphicon-ok"}/>
                            : <i className={"glyphicon glyphicon-remove"}/>
                        }</td>
                    </tr>)
                    }
                    </tbody>

                </table>
            </div>
        </div>

    </div>
;


export default ExerciseDetails;
