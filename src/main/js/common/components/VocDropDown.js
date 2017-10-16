import React from 'react'


const VocDropDown = ({id, value, onChange, items}) => <select
    value={value}
    onChange={onChange}
    className="form-control"
    id={id}
>
    {items.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
</select>;

export default VocDropDown;

