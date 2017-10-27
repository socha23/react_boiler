import React from 'react'
import {Type, Priority} from './ArtifactVocs'
import * as vocFunctions from '../common/vocFunctions'
import VocIcon from '../common/components/VocIcon'
import {EnumFilter} from '../common/components/filters'

const STYLE_FLAG_COLUMN = {width: 60, textAlign: "center"};

export const ArtifactsList = ({selected = {}, items = [], onSelectItem = (() => {})}) => <div>
    <table className="table table-hover table-pointer">
        <thead>
        <tr>
            <th>Typ</th>
            <th>Nazwa</th>
            <th>Znacznik</th>
            <th>Skrzynia</th>
            <th>Priorytet</th>
        </tr>
        </thead>
        <tbody>
        {items.map(a => <tr key={a.id} className={selected == a ? 'success' : ''} onClick={() => {onSelectItem(a)}}>
            <td><VocIcon value={vocFunctions.find(Type, a.type)}/></td>
            <td>{a.name}</td>
            <td style={STYLE_FLAG_COLUMN}>{a.tagId ? <i className="glyphicon glyphicon-ok" /> : <span/>}</td>
            <td style={STYLE_FLAG_COLUMN}>{a.crateId ? <i className="glyphicon glyphicon-ok" /> : <span/>}</td>
            <td style={STYLE_FLAG_COLUMN}><VocIcon value={vocFunctions.find(Priority, a.priority)}/></td>
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

