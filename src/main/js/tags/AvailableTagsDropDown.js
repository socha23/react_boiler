import React from 'react'
import {connect} from 'react-redux'
import {availableTags} from './tagHelpers'
import TagValue from './TagValue'
import Select from 'react-select'

const optionRenderer = (item) => <TagValue tag={item}/>;

const TagDropDown = ({id, value, items, onChange}) => {
    console.log("v", value);

return <Select
    value={value}
    options={items}
    labelKey="name"
    valueKey="id"
    optionRenderer={optionRenderer}
    valueRenderer={optionRenderer}
    onChange={(i) => onChange(i.id)}
    clearable={false}
    id={id}
/>};

const mapStateToProps = (state, ownProps) => ({
    items: availableTags(state.artifacts.items, state.tags.items, ownProps.forArtifact)
});

export default connect(mapStateToProps)(TagDropDown);
