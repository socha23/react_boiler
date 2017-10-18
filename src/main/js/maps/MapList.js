import React from 'react'

export const MapList = ({selected = {}, items = [], onSelectItem = (() => {})}) => <div>
    <table className="table table-hover table-pointer">
        <thead>
        <tr>
            <th>Nazwa</th>
        </tr>
        </thead>
        <tbody>
        {items.map(t => <tr key={t.id} className={selected == t ? 'success' : ''} onClick={() => {onSelectItem(t)}}>
            <td>{t.name}</td>
        </tr>)
        }
        </tbody>

    </table>
</div>;

