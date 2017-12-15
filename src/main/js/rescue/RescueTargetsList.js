import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import HeightExpander from '../common/components/HeightExpander'

import TaggedObjectsList from '../tags/TaggedObjectsList'

const RescueTargetsList = ({
    selected = {},
    tags = [],
    onSelect = () => {}
    }) => <div>
    <HeightExpander>
        <TaggedObjectsList selected={selected} tags={tags} onSelect={onSelect}/>
    </HeightExpander>
</div>;

export default RescueTargetsList