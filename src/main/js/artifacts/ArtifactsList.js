import React from 'react'
import {Type, Priority} from './ArtifactVocs'
import {EnumFilter} from '../common/components/filters'

export const ArtifactsList = ({items}) => <div>
    <table className="table table-hover">
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

