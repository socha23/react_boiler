import React from 'react'
import TagValue from '../tags/TagValue'

const FireteamsList = ({selected = {}, items = [], onSelect = (() => {})}) => <div>
    <table className="table table-hover table-pointer">
        <thead>
        <tr>
            <th>Nazwa</th>
            <th>Znacznik</th>
        </tr>
        </thead>
        <tbody>
        {items.map(t => <tr key={t.id} className={selected.id == t.id ? 'success' : ''} onClick={() => {onSelect(t)}}>
            <td>{t.name}</td>
            <td><TagValue tagId={t.tagId} inline/></td>
        </tr>)
        }
        </tbody>

    </table>
</div>;

export default FireteamsList