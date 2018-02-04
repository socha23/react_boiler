import React from 'react'
import {expectElem, expectElemWithProvider} from '../../testUtils'

import StatusBar from 'fireteams/app/StatusBar'

const TAG_FIRETEAM = {
    id: "fireteamTag",
    coordinateSystemId: "floor1",
    position: {x: 0, y: 0}
};

const TAG_TARGET_SAME_FLOOR_5M = {
    id: "targetTag1",
    coordinateSystemId: "floor1",
    areaName: "Pierwsze piętro",
    position: {x: 0, y: 5}
};

const FIRETEAM = {
    tagId: "fireteamTag",
    targetTagId: "targetTag1"
};

const FIRETEAM_NO_TARGET = {
    tagId: "fireteamTag"
};


const ARTIFACT = {
    id: "art1",
    tagId: TAG_TARGET_SAME_FLOOR_5M.id,
    name: "Artefakt testowy"
};

const state = {
    tags: {items: [TAG_FIRETEAM, TAG_TARGET_SAME_FLOOR_5M]},
    artifacts: {items: [ARTIFACT]},
    fireteams: {items: [FIRETEAM, FIRETEAM_NO_TARGET]}
};

it('contains right text when no target', () => {
    expectElemWithProvider(
        <StatusBar fireteam={FIRETEAM_NO_TARGET}/>
        , state).toIncludeText("Brak wyznaczonego celu")
});

it('contains artifact name when target is set', () => {
    expectElemWithProvider(
        <StatusBar fireteam={FIRETEAM}/>
        , state).toIncludeText(ARTIFACT.name)
});