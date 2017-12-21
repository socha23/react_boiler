import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'

import {availableTags} from './tagHelpers'
import TagValue from './TagValue'

const optionRenderer = (item) => <TagValue tag={item} inline/>;

const TagDropDown = ({id, value, items, onChange}) => <Select
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
    items: availableTags(
        [state.artifacts.items, state.fireteams.items],
        state.tags.items, ownProps.for)
});

export default connect(mapStateToProps)(TagDropDown);
