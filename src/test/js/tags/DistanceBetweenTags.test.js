import React from 'react'
import {expectElementToContainText} from '../testUtils'

import DistanceBetweenTags from 'tags/DistanceBetweenTags'

function tagOneWithState(state) {
    return {position: {x: 0, y: 10}, state: state}
}

function tagTwoWithState(state) {
    return {position: {x: 10, y: 10}, state: state}
}


it('renders distance when both tags inside', expectElementToContainText(
    <DistanceBetweenTags from={tagOneWithState("INSIDE")} to={tagTwoWithState("INSIDE")}/>, "m"
));

it('renders "?" when one tag in container', expectElementToContainText(
    <DistanceBetweenTags from={tagOneWithState("INSIDE")} to={tagTwoWithState("IN_CONTAINER")}/>, "?"
));

it('renders "?" when one tag missing', expectElementToContainText(
    <DistanceBetweenTags from={tagOneWithState("MISSING")} to={tagTwoWithState("INSIDE")}/>, "?"
));
