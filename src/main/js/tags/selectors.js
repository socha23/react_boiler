import {createSelector} from 'reselect'

import {indexById, groupBy} from '../common/resourceFunctions'

import {isInside} from './tagHelpers'



export const getAllTags = state => state.tags.items || [];

export const getTagsById = state =>  state.tags.itemsById || {};

export const getTagsInside = createSelector([getAllTags], tags => tags.filter(isInside));

export const getTagsInsideById = createSelector([getAllTags], tags => indexById(tags.filter(isInside)));

export const getTagsInsideByCoordinateSystemId = createSelector([getTagsInside], tags => groupBy(tags, "coordinateSystemId"));


