import {createSelector} from 'reselect'

import {getFloorPlanById} from '../maps/selectors'
import {getTagsById} from '../tags/selectors'
import {isInCoordinateSystem} from '../tags/tagHelpers'


export const getAllFireteams = state => state.fireteams.items || [];
export const getFireteamsById = state => state.fireteams.itemsById || {};

export const getFireteamsAssignedTo = (state, targetTag) => getAllFireteams(state).filter(ft => ft.targetTagId == targetTag.id);

export const getSortedFireteams = createSelector([getAllFireteams], (fireteams) => [...fireteams].sort((a, b) => a.name.localeCompare(b.name)));

export function getFireteamById(state, id) {
    return getFireteamsById(state)[id]
}

export function getFireteamTag(state, fireteam) {
    if (fireteam && fireteam.tagId) {
        return getTagsById(state)[fireteam.tagId];
    } else {
        return null;
    }
}

export function getFireteamFloorPlan(state, fireteam) {
    const tag = getFireteamTag(state, fireteam);
    if (tag) {
        return getFloorPlanById(state, tag.coordinateSystemId)
    } else {
        return null
    }
}


export function getTargetTag(state, fireteam) {
    if (fireteam && fireteam.targetTagId) {
        return getTagsById(state)[fireteam.targetTagId];
    } else {
        return null;
    }
}

export function getFireteamAndTargetTags(state, coordinateSystemId) {
    return getAllFireteams(state)
        .map(ft => ({
            fireteam: ft,
            fireteamTag: getFireteamTag(state, ft),
            targetTag: getTargetTag(state, ft)}))
        .filter(triplet =>
            isInCoordinateSystem(triplet.fireteamTag, coordinateSystemId)
            && isInCoordinateSystem(triplet.targetTag, coordinateSystemId)
        );
}
