import React from 'react'
import {connect} from 'react-redux'

import {getTagDescription} from './selectors-additional'

const TagDescriptionComponent = ({name}) => <span>{name}</span>;

export default connect((state, {tag}) => ({
    name: getTagDescription(state, tag)
}))(TagDescriptionComponent)
