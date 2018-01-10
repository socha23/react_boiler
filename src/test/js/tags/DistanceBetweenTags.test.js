import React from 'react'
import {expectElem} from '../testUtils'

import DistanceBetweenTags from 'tags/DistanceBetweenTags'

function tagOneWithState(state) {
    return {position: {x: 0, y: 10}, state: state}
}

function tagTwoWithState(state) {
    return {position: {x: 10, y: 10}, state: state}
}

it('renders distance when both tags inside', () => {
    expectElem(
        <DistanceBetweenTags from={tagOneWithState("INSIDE")} to={tagTwoWithState("INSIDE")}/>
    ).toIncludeText("m")
});

it('renders "?" when one tag in container', () => {
    expectElem(
        <DistanceBetweenTags from={tagOneWithState("INSIDE")} to={tagTwoWithState("IN_CONTAINER")}/>
    ).toIncludeText("?")
});

it('renders "?" when one tag missing', () => {
    expectElem(
        <DistanceBetweenTags from={tagOneWithState("MISSING")} to={tagTwoWithState("INSIDE")}/>
    ).toIncludeText("?")
});
