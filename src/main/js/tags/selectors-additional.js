import {createSelector} from 'reselect'

import {getAllTags} from './selectors'
import {getAllFireteams} from '../fireteams/selectors'
import {getAllArtifacts} from '../artifacts/selectors'

export const getTagDescriptions = createSelector([getAllTags, getAllArtifacts, getAllFireteams],
    (tags, artifacts, fireteams) => {
        const result = {};
        tags.forEach(t => {result[t.id] = t.name});
        artifacts.forEach(a => {result[a.tagId] = a.name});
        fireteams.forEach(f => {result[f.tagId] = f.name});
        return result;
    }
);

export const getTagDescription = (state, tag) => getTagDescriptions(state)[tag.id];


