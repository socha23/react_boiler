import React from 'react'
import {testSnapshotWithProvider, expectElemWithProvider} from '../testUtils'

import FireteamTargetChooser from 'rescue/FireteamTargetChooser'

const T_1 = {
    id: "T_1",
    state: "INSIDE",
    areaName: "inside"
};
const T_2 = {
    id: "T_2",
    state: "INSIDE",
    areaName: "inside"
};
const T_3 = {
    id: "T_3",
    state: "MISSING",
    areaName: "inside"
};
const T_4 = {
    id: "T_4",
    state: "INSIDE",
    areaName: "inside"
};

const FT = {
    id: "FT",
    name: "fireteam",
    tagId: T_1.id,
    targetTagId: T_2.id
};

const A_1 = {
    id: "A_1",
    name: "artifact_1",
    priority: "P1_LOW",
    tagId: T_2.id
};
const A_2 = {
    id: "A_2",
    name: "artifact_2",
    priority: "P1_LOW",
    tagId: T_3.id
};



const STATE = {
        tags: {
            items: [T_1, T_2, T_3, T_4],
            itemsById: {T_1: T_1, T_2: T_2, T_3: T_3, T_4: T_4}
        },
        artifacts: {
            items: [A_1, A_2],
            itemsById: {A_1: A_1, A_2: A_2}
        },
        fireteams: {
            items: [FT],
            itemsById: {FT: FT}
        }
    };


it('renders correctly', testSnapshotWithProvider(<FireteamTargetChooser/>, STATE));

it('renders correctly when state empty', testSnapshotWithProvider(
    <FireteamTargetChooser/>, {
        tags: {},
        artifacts: {},
        fireteams: {}
    }
));

it('shows artifact inside', () => {
    expectElemWithProvider(
        <FireteamTargetChooser/>, STATE
    ).toIncludeText("artifact_1")
});

it('doesnt show artifact with missing tag', () => {
    expectElemWithProvider(
        <FireteamTargetChooser/>, STATE
    ).not.toIncludeText("artifact_2")
});
