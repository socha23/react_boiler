import React, {Component} from 'react'
import {crudList} from '../common/crud/crudContainers'

import ArtifactForm from './ArtifactForm'

var MyList = ({items, reloadItems}) => <div>
    <h1>Artifacts list</h1>

    <ArtifactForm/>

    <table className="table">
        <thead>
        <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Bought on</th>
        </tr>
        </thead>
        <tbody>
        {items.map(a => <tr key={a.id}>
            <td>{a.name}</td>
            <td>{a.weight}</td>
            <td>{a.boughtOn}</td>
        </tr>)
        }
        </tbody>

    </table>
    <a className="btn btn-primary" onClick={reloadItems}>Reload</a>

</div>;

export default crudList("artifacts", MyList)