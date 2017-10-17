import React from 'react'

export const TagsList = ({selected = {}, items = [], onSelectItem = (() => {})}) => <div>
    <table className="table table-hover table-pointer">
        <thead>
        <tr>
            <th>Nazwa</th>
            <th>Obszar</th>
            <th>Pozycja</th>
        </tr>
        </thead>
        <tbody>
        {items.map(t => <tr key={t.id} className={selected == t ? 'success' : ''} onClick={() => {onSelectItem(t)}}>
            <td>{t.name}</td>
            <td>{t.coordinateSystemName}</td>
            <td>{t.position.x}, {t.position.y}</td>
        </tr>)
        }
        </tbody>

    </table>
</div>;

