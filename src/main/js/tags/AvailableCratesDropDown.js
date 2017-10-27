import React from 'react'
import {connect} from 'react-redux'
import {availableCrates} from './locatorHelpers'
import LocatorValue from './LocatorValue'
import Select from 'react-select'

const optionRenderer = (item) => <LocatorValue locator={item}/>;

const CrateDropDown = ({id, value, items, onChange}) => <Select
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
    items: availableCrates(state.artifacts.items, state.locators.items, ownProps.forArtifact)
});

export default connect(mapStateToProps)(CrateDropDown);
