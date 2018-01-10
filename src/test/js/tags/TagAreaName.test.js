import React from 'react'
import {testSnapshot, expectElem} from '../testUtils'

import {TagAreaNameComponent} from 'tags/TagAreaName'

const TAG_INSIDE = {state: "INSIDE", areaName: "inside"};
const TAG_IN_CONTAINER = {state: "IN_CONTAINER", areaName: "in container"};
const TAG_MISSING = {state: "MISSING", areaName: "missing"};

it('renders correctly when inside', testSnapshot(
    <TagAreaNameComponent tag={TAG_INSIDE}/>
));


it('contains area name when inside', () => {
    expectElem(
        <TagAreaNameComponent tag={TAG_INSIDE}/>
    ).toIncludeText("inside")
});

it('contains "poza budynkiem" when missing', () => {
    expectElem(
        <TagAreaNameComponent tag={TAG_MISSING}/>
    ).toIncludeText("poza budynkiem")
});


it('contains "w kontenerze" when in container', () => {
    expectElem(
        <TagAreaNameComponent tag={TAG_IN_CONTAINER}/>
    ).toIncludeText("w kontenerze")
});
