import {createSelector} from 'reselect'

import {indexById} from '../common/resourceFunctions'

import {getTagsById} from '../tags/selectors'
import {isInside, isInCoordinateSystem} from '../tags/tagHelpers'


export const getAllFireteams = state => state.fireteams.items || [];
export const getFireteamsById = state => state.fireteams.itemsById || {};

export const getFireteamsAssignedTo = (state, targetTag) => getAllFireteams(state).filter(ft => ft.targetTagId == targetTag.id);


export function getFireteamById(state, id) {
    console.log("ghbi called");
    return getFireteamsById(state)[id]
}

export function getFireteamTag(state, fireteam) {
    const tagsById = getTagsById(state);
    if (fireteam.tagId) {
        return tagsById[fireteam.tagId];
    } else {
        return null;
    }
}

export function getTargetTag(state, fireteam) {
    const tagsById = getTagsById(state);
    if (fireteam.targetTagId) {
        return tagsById[fireteam.targetTagId];
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
