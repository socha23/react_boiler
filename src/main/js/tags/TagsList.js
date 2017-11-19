import React from 'react'

export const TagsList = ({selected = {}, items = [], onSelect = (() => {})}) => <div>
    <table className="table table-hover table-pointer">
        <thead>
        <tr>
            <th>Nazwa</th>
            <th>Piętro</th>
            <th>Obszar</th>
            <th>Pozycja</th>
        </tr>
        </thead>
        <tbody>
        {items.map(t => <tr key={t.id} className={selected == t ? 'success' : ''} onClick={() => {onSelect(t)}}>
            <td>{t.name}</td>
            <td>{t.coordinateSystemName}</td>
            <td>{t.areaName}</td>
            <td>{t.position.x}, {t.position.y}</td>
        </tr>)
        }
        </tbody>

    </table>
</div>;

