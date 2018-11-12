import React from 'react'

export const LocatorsList = ({selected = {}, items = [], onSelect = (() => {})}) => <div>
    <table className="table table-hover table-pointer">
        <thead>
        <tr>
            <th>Nazwa</th>
            <th>Pozycja</th>
        </tr>
        </thead>
        <tbody>
        {items.map(t => <tr key={t.id} className={selected == t ? 'success' : ''} onClick={() => {onSelect(t)}}>
            <td>{t.name}</td>
            <td>{t.location.latitude}, {t.location.longitude}</td>
        </tr>)
        }
        </tbody>

    </table>
</div>;

