import React from 'react'
import {connect} from 'react-redux'
import LocatorValue from './LocatorValue'
import Select from 'react-select'

const optionRenderer = (item) => <LocatorValue locator={item}/>;

const LocatorDropDown = ({id, value, items, onChange}) => <Select
    value={value}
    options={items}
    labelKey="name"
    valueKey="id"
    optionRenderer={optionRenderer}
    valueRenderer={optionRenderer}
    onChange={(i) => onChange(i ? i.id : null)}
    clearable={false}
    id={id}
/>;

const mapStateToProps = (state, ownProps) => ({
    items: state.locators.items
});

export default connect(mapStateToProps)(LocatorDropDown);
