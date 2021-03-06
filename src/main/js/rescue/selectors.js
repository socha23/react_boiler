import {createSelector} from 'reselect'

import {getAllArtifacts} from '../artifacts/selectors'
import {getAllFireteams} from '../fireteams/selectors'
import {getAllTags} from '../tags/selectors'
import {isInside} from '../tags/tagHelpers'

export const getNavPoints = createSelector([getAllArtifacts, getAllFireteams, getAllTags],
    (artifacts, fireteams, tags) => {
        let result = [];
        let nonNavTagIds = {};
        artifacts.forEach(a => {
            if (a.tagId) nonNavTagIds[a.tagId] = a.tagId
        });
        fireteams.forEach(a => {
            if (a.tagId) nonNavTagIds[a.tagId] = a.tagId
        });
        tags.forEach(t => {
            if (!nonNavTagIds[t.id] && isInside(t)) {
                result.push({...t, tagId: t.id});
            }
        });
        return result;
    }
);
