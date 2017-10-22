import React from 'react'
import Select from 'react-select'
import VocIcon from './VocIcon'

function optionRenderer(item) {
    return <span><VocIcon value={item} className="iconWithName"/>{item.name}</span>
}


const VocDropDown = ({id, value, items, onChange}) => <Select
    value={value}
    options={items}
    labelKey="name"
    valueKey="id"
    optionRenderer={optionRenderer}
    valueRenderer={optionRenderer}
    onChange={(i) => onChange(i.id)}
    clearable={false}
    id={id}
/>;

export default VocDropDown;
