import React from 'react'
import {Type, Priority} from './ArtifactVocs'
import * as vocFunctions from '../common/vocFunctions'
import VocIcon from '../common/components/VocIcon'
import {EnumFilter} from '../common/components/filters'

export const ArtifactsList = ({items}) => <div>
    <table className="table table-hover">
        <thead>
        <tr>
            <th>Typ</th>
            <th>Nazwa</th>
            <th>Priorytet</th>
        </tr>
        </thead>
        <tbody>
        {items.map(a => <tr key={a.id}>
            <td><VocIcon value={vocFunctions.find(Type, a.type)}/></td>
            <td>{a.name}</td>
            <td><VocIcon value={vocFunctions.find(Priority, a.priority)}/></td>
        </tr>)
        }
        </tbody>

    </table>
</div>;

export const ArtifactTypeFilter = ({filter, onFilterChange}) => <EnumFilter
    items={Type}
    field="type"
    filter={filter}
    onFilterChange={onFilterChange}
/>;

export const ArtifactPriorityFilter = ({filter, onFilterChange}) => <EnumFilter
    items={Priority}
    field="priority"
    filter={filter}
    onFilterChange={onFilterChange}
/>;

