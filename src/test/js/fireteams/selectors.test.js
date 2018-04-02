import * as selectors from 'fireteams/selectors'
import moment from 'moment'

import {TAG_STATES} from 'tags/tagHelpers'

const FIRETEAM_A = {
    name: "a",
    targetTagId: null,
    lastActive: null
};

const FIRETEAM_B = {
    name: "b",
    targetTagId: null,
    lastActive: secondsAgo(500)
};

const FIRETEAM_C = {
    name: "c",
    targetTagId: null,
    lastActive: secondsAgo(30)
};
const state = {
    fireteams: {items: [FIRETEAM_A, FIRETEAM_B, FIRETEAM_C]}
};

it('getSortedFireteams returns sorted fireteams', () => {
    expect(selectors.getSortedFireteams(state)).toEqual([FIRETEAM_A, FIRETEAM_B, FIRETEAM_C]);
});

it('getActiveFireteams', () => {
    expect(selectors.getActiveFireteams(state, 1000)).toEqual([FIRETEAM_B, FIRETEAM_C]);
    expect(selectors.getActiveFireteams(state, 50)).toEqual([FIRETEAM_C]);
    expect(selectors.getActiveFireteams(state, 15)).toEqual([]);
});


function secondsAgo(howMany) {
    return moment().subtract(howMany, "seconds").format("YYYY-MM-DDTHH:mm:ss")
}