import {createSelector} from 'reselect'

import {groupBy, indexById} from '../common/resourceFunctions'

import {isInside} from './tagHelpers'

const getRawTags = state => state.tags.items || [];
const getRawFireteams = state => state.fireteams.items || [];
const getRawArtifacts = state => state.artifacts.items || [];


const tagCompare = (t1, t2) => {

    function priority(type) {
        switch (type) {
            case "fireteam":
                return 0;
            case "artifact":
                return 1;
            case "navigation":
                return 2;
            default:
                return 3;
        }
    }
    if (priority(t1.type) != priority(t2.type)) {
        return priority(t1.type) - priority(t2.type)
    } else {
        return t1.label.localeCompare(t2.label);
    }
};

export const getAllTags = createSelector([getRawTags, getRawFireteams, getRawArtifacts],
    (tags, fireteams, artifacts) => {
        const additionalData = getAdditionalTagData(tags, fireteams, artifacts);
        let result = tags.map(t =>
            ({...t, ...(additionalData[t.id])})
        );
        result.sort(tagCompare);
        return result;

    });


export const getTagsById = createSelector([getAllTags], tags => indexById(tags));

export const getTagsInside = createSelector([getAllTags], tags => tags.filter(isInside));

export const getTagsInsideById = createSelector([getAllTags], tags => indexById(tags.filter(isInside)));

export const getTagsInsideByCoordinateSystemId = createSelector([getTagsInside], tags => groupBy(tags, "coordinateSystemId"));

export const getTagsOnFloor = (state, floorId) => getTagsInsideByCoordinateSystemId(state)[floorId];

function getAdditionalTagData(tags, fireteams, artifacts) {
    const result = {};
    fillAdditionalData(result, tags, "id", "name", "navigation", "#5bc0de");
    fillAdditionalData(result, fireteams, "tagId", "name", "fireteam", "#d9534f");
    fillAdditionalData(result, artifacts, "tagId", "name", "artifact", "#337ab7");
    return result;
}

function fillAdditionalData(result, items, idField, labelField, type, color) {
    items.forEach(i => {
        result[i[idField]] = {type: type, color: color, label: i[labelField]}
    });
}




