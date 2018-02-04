import {createSelector} from 'reselect'

import {indexById, groupBy, indexBy} from '../common/resourceFunctions'

import {isInside} from './tagHelpers'

export const getAllTags = state => state.tags.items || [];

export const getTagsById = createSelector([getAllTags], tags => indexById(tags));

export const getTagsInside = createSelector([getAllTags], tags => tags.filter(isInside));

export const getTagsInsideById = createSelector([getAllTags], tags => indexById(tags.filter(isInside)));

export const getTagsInsideByCoordinateSystemId = createSelector([getTagsInside], tags => groupBy(tags, "coordinateSystemId"));
