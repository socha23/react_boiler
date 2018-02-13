import {createSelector} from 'reselect'
import {indexBy} from '../common/resourceFunctions'

import {getTagsInsideById} from '../tags/selectors'

export const getAllArtifacts = state => state.artifacts.items || [];

export const getArtifactsInside = createSelector([getAllArtifacts, getTagsInsideById],
    (artifacts, tagsInside)=> artifacts.filter(a => a.tagId && tagsInside[a.tagId])
);

export const getArtifactsByTagId = createSelector([getAllArtifacts],
    (artifacts) => indexBy(artifacts, "tagId")
);

export const findArtifactByTagId = (state, tagId) => getArtifactsByTagId(state)[tagId];

