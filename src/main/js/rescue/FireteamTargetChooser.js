import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import TaggedObjectsList from '../tags/TaggedObjectsList'

const RescueTargetsChooser = ({
        selected = {},
        tags = [],
        onSelect = () => {}
    }) =>
        <TaggedObjectsList selected={selected} tags={tags} onSelect={onSelect}/>;

export default RescueTargetsChooser