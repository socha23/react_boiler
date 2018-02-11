import React from 'react'
import {expectElemWithProvider} from '../../testUtils'

import TargetBar from 'fireteams/app/TargetBar'
import TargetDistance from 'fireteams/app/TargetDistance'

import {TAG_STATES} from 'tags/tagHelpers'

const TAG_FIRETEAM = {
    id: "fireteamTag",
    coordinateSystemId: "floor1",
    position: {x: 0, y: 0},
    state: TAG_STATES.INSIDE

};

const TAG_TARGET_SAME_FLOOR_5M = {
    id: "targetTag1",
    coordinateSystemId: "floor1",
    areaName: "Pierwsze piętro",
    position: {x: 0, y: 5},
    state: TAG_STATES.INSIDE
};

const TAG_TARGET_OTHER_FLOOR_10M = {
    id: "targetTag2",
    coordinateSystemId: "floor2",
    areaName: "Inne piętro",
    position: {x: 0, y: 10},
    state: TAG_STATES.INSIDE
};

const FIRETEAM = {
    tagId: "fireteamTag",
    targetTagId: "targetTag1"
};

const FIRETEAM_TARGET_ON_OTHER_FLOOR = {
    tagId: "fireteamTag",
    targetTagId: "targetTag2"
};

const FIRETEAM_NO_TARGET = {
    tagId: "fireteamTag"
};


const ARTIFACT = {
    id: "art1",
    tagId: TAG_TARGET_SAME_FLOOR_5M.id,
    name: "Artefakt testowy"
};

const OTHER_ARTIFACT = {
    id: "art2",
    tagId: TAG_TARGET_OTHER_FLOOR_10M.id,
    name: "Artefakt testowy"
};


const state = {
    tags: {items: [TAG_FIRETEAM, TAG_TARGET_SAME_FLOOR_5M, TAG_TARGET_OTHER_FLOOR_10M]},
    artifacts: {items: [ARTIFACT]},
    fireteams: {items: [FIRETEAM, FIRETEAM_NO_TARGET, FIRETEAM_TARGET_ON_OTHER_FLOOR]}
};

it('contains right text when no target', () => {
    expectElemWithProvider(
        <TargetBar fireteam={FIRETEAM_NO_TARGET}/>
        , state).toIncludeText("Brak wyznaczonego celu")
});

it('contains artifact name when target is set', () => {
    expectElemWithProvider(
        <TargetBar fireteam={FIRETEAM}/>
        , state).toIncludeText(ARTIFACT.name)
});

it('contains distance to target when target is set', () => {
    expectElemWithProvider(
        <TargetDistance fireteam={FIRETEAM}/>
        , state).toIncludeText("5")
});

it('contains floor name if other', () => {
    expectElemWithProvider(
        <TargetDistance fireteam={FIRETEAM_TARGET_ON_OTHER_FLOOR}/>
        , state).toIncludeText("Inne")
});