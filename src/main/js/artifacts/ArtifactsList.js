import React from 'react'
import {Type, Priority} from './ArtifactVocs'
import * as vocFunctions from '../common/vocFunctions'
import VocIcon from '../common/components/VocIcon'
import {ToggleButtonsFilter, PopupToggleButtonsFilter} from '../common/components/filters'
import LocatorValue from '../tags/LocatorValue'
import * as Responsive from '../common/components/responsive'

const STYLE_FLAG_COLUMN = {width: 60, textAlign: "center"};

const ArtifactNameColumn = ({artifact}) => <div>
    {artifact.name}
    {artifact.currentLocatorId ?
        <span> (<LocatorValue locatorId={artifact.currentLocatorId} link/>)</span>
    : <span/>}
</div>;


const NarrowArtifactsList = ({selected = {}, items = [], onSelectItem = (() => {})}) => <div>
    <table className="table table-hover table-pointer">
        <thead>
        <tr>
            <th>Typ</th>
            <th>Nazwa</th>
            <th>Priorytet</th>
        </tr>
        </thead>
        <tbody>
        {items.map(a => <tr key={a.id} className={selected == a ? 'success' : ''} onClick={() => {onSelectItem(a)}}>
            <td><VocIcon value={vocFunctions.find(Type, a.type)}/></td>
            <td><ArtifactNameColumn artifact={a}/></td>
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
            <th>Znacznik</th>
            <th>Skrzynia</th>
            <th>Priorytet</th>
        </tr>
        </thead>
        <tbody>
        {items.map(a => <tr key={a.id} className={selected == a ? 'success' : ''} onClick={() => {onSelectItem(a)}}>
            <td><VocIcon value={vocFunctions.find(Type, a.type)}/></td>
            <td><ArtifactNameColumn artifact={a}/></td>
            <td style={STYLE_FLAG_COLUMN}>{a.tagId ? <i className="glyphicon glyphicon-ok" /> : <span/>}</td>
            <td style={STYLE_FLAG_COLUMN}>{a.crateId ? <i className="glyphicon glyphicon-ok" /> : <span/>}</td>
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

