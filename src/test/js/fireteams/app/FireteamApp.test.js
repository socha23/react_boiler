import React from 'react'
import {elemWithProvider} from '../../testUtils'

import FireteamApp from 'fireteams/app/FireteamApp'

import {TAG_STATES} from 'tags/tagHelpers'

const TAG_FIRETEAM = {
    id: "fireteamTag",
    coordinateSystemId: "floor1",
    position: {x: 0, y: 0},
    state: TAG_STATES.INSIDE
};

const FIRETEAM_NO_TARGET = {
    tagId: "fireteamTag",
    targetTagId: null
};

const FLOOR = {
    id: "floor1"
};

const state = {
    tags: {items: [TAG_FIRETEAM]},
    artifacts: {items: []},
    fireteams: {items: [FIRETEAM_NO_TARGET]},
    floorPlans: {items: [FLOOR]}
};

it('renders when no target', () => {
    elemWithProvider(
        <FireteamApp fireteam={FIRETEAM_NO_TARGET}/>
        , state)
});

