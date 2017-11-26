import React from 'react'

import * as vocFunctions from '../common/vocFunctions'
import VocIcon from '../common/components/VocIcon'

import {ToggleButtonsFilter, PopupToggleButtonsFilter} from '../common/components/filters'
import * as Responsive from '../common/components/responsive'

import ArtifactLocation from "./ArtifactLocation"
import {Type, Priority} from './ArtifactVocs'
import LocatorValue from '../tags/LocatorValue'

const STYLE_FLAG_COLUMN = {width: 60, textAlign: "center"};


const NarrowArtifactsList = ({selected = {}, items = [], onSelectItem = (() => {})}) => <div>
    <table className="table table-hover table-pointer">
        <thead>
        <tr>
            <th>Typ</th>
            <th>Nazwa</th>
            <th>Położenie</th>
            <th>Priorytet</th>
        </tr>
        </thead>
        <tbody>
        {items.map(a => <tr key={a.id} className={selected == a ? 'success' : ''} onClick={() => {onSelectItem(a)}}>
            <td><VocIcon value={vocFunctions.find(Type, a.type)}/></td>
            <td>{a.name}</td>
            <td><ArtifactLocation artifact={a}/></td>
            <td style={STYLE_FLAG_COLUMN}><VocIcon value={vocFunctions.find(Priority, a.priority)}/></td>
        </tr>)
        }
        </tbody>

    </table>
</div>;

const WideArtifactsList = ({selected = {}, items = [], onSelectItem = (() => {})}) => <div>
    <table className="table table-hover table-pointer">
        <thead>
        <tr>
            <th>Typ</th>
            <th>Nazwa</th>
            <th>Położenie</th>
            {/*
            <th>Znacznik</th>
            <th>Skrzynia</th>
                */}
            <th>Priorytet</th>
        </tr>
        </thead>
        <tbody>
        {items.map(a => <tr key={a.id} className={selected == a ? 'success' : ''} onClick={() => {onSelectItem(a)}}>
            <td><VocIcon value={vocFunctions.find(Type, a.type)}/></td>
            <td>{a.name}</td>
            <td><ArtifactLocation artifact={a}/></td>
            {/*
            <td style={STYLE_FLAG_COLUMN}>{a.tagId ? <i className="glyphicon glyphicon-ok" /> : <span/>}</td>
            <td style={STYLE_FLAG_COLUMN}>{a.crateId ? <i className="glyphicon glyphicon-ok" /> : <span/>}</td>
                */}
            <td style={STYLE_FLAG_COLUMN}><VocIcon value={vocFunctions.find(Priority, a.priority)}/></td>
        </tr>)
        }
        </tbody>

    </table>
</div>;

export const ArtifactsList = (props) => <div>
    <Responsive.Below1024>
        <NarrowArtifactsList {...props}/>
    </Responsive.Below1024>
    <Responsive.Above1024>
        <WideArtifactsList {...props}/>
    </Responsive.Above1024>
</div>;

export const PopupArtifactTypeFilter = ({filter, onFilterChange}) => <PopupToggleButtonsFilter
    items={Type}
    field="type"
    filter={filter}
    onFilterChange={onFilterChange}
    labelPopupTitle="Wybierz typy muzealiów"
    labelNoSelection="Dowolny typ"
/>;

export const PopupArtifactPriorityFilter = ({filter, onFilterChange}) => <PopupToggleButtonsFilter
    items={Priority}
    field="priority"
    filter={filter}
    onFilterChange={onFilterChange}
    labelPopupTitle="Wybierz priorytety"
    labelNoSelection="Dowolny priorytet"
/>;


export const ArtifactTypeFilter = ({filter, onFilterChange}) => <ToggleButtonsFilter
    items={Type}
    field="type"
    filter={filter}
    onFilterChange={onFilterChange}
/>;

export const ArtifactPriorityFilter = ({filter, onFilterChange}) => <ToggleButtonsFilter
    items={Priority}
    field="priority"
    filter={filter}
    onFilterChange={onFilterChange}
/>;

