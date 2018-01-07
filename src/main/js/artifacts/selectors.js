import {createSelector} from 'reselect'

import {getTagsInsideById} from '../tags/selectors'

export const getAllArtifacts = state => state.artifacts.items || [];

export const getArtifactsInside = createSelector([getAllArtifacts, getTagsInsideById],
    (artifacts, tagsInside)=> artifacts.filter(a => a.tagId && tagsInside[a.tagId])
);
