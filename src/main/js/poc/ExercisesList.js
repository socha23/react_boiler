import React from 'react'
import moment from 'moment'
import {exerciseScore, exerciseScorePercent} from "./exerciseFunctions";

const ExercisesList = ({selected = {}, items = [], onSelectItem = (() => {})}) => (items.empty ?
    <h1>Nie znaleziono ćwiczących</h1> : <div>
    <table className="table table-hover table-pointer">
        <thead>
        <tr>
            <th>Data</th>
            <th>Szkolony</th>
            <th>Wynik</th>
        </tr>
        </thead>
        <tbody>
        {items.map(a => <tr key={a.id} className={selected == a ? 'success' : ''} onClick={() => {onSelectItem(a)}}>
            <td>{moment(a.when).format("YYYY.MM.DD HH:mm")}</td>
            <td>{a.user}</td>
            <td>{exerciseScore(a)} ({exerciseScorePercent(a)})</td>
        </tr>)
        }
        </tbody>

    </table>
</div>);

export default ExercisesList;