import {createSelector} from 'reselect'
import {indexBy} from '../common/resourceFunctions'

import {getTagsInsideById} from '../tags/selectors'

export const getAllArtifacts = state => state.artifacts.items || [];


const artifactCompare = (a1, a2) => {

    const priority = a2.priority.localeCompare(a1.priority);
    const name = a1.name.localeCompare(a2.name);
    const id = a1.id.localeCompare(a2.id);

    return priority ? priority : name ? name : id;
};

export const getSortedArtifacts = createSelector([getAllArtifacts],
    (artifacts) => [...artifacts].sort(artifactCompare)
);


export const getArtifactsInside = createSelector([getSortedArtifacts, getTagsInsideById],
    (artifacts, tagsInside)=> artifacts.filter(a => a.tagId && tagsInside[a.tagId])
);

export const getArtifactsByTagId = createSelector([getAllArtifacts],
    (artifacts) => indexBy(artifacts, "tagId")
);

export const findArtifactByTagId = (state, tagId) => getArtifactsByTagId(state)[tagId];

