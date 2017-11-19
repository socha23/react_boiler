import React from 'react'

const FireteamsList = ({selected = {}, items = [], onSelect = (() => {})}) => <div>
    <table className="table table-hover table-pointer">
        <thead>
        <tr>
            <th>Nazwa</th>
        </tr>
        </thead>
        <tbody>
        {items.map(t => <tr key={t.id} className={selected == t ? 'success' : ''} onClick={() => {onSelect(t)}}>
            <td>{t.name}</td>
        </tr>)
        }
        </tbody>

    </table>
</div>;

export default FireteamsList