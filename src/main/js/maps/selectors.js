import {createSelector} from 'reselect'

export const getFloorPlans = state => state.floorPlans.items || [];
export const getFloorPlansById = state => state.floorPlans.itemsById || {};

export const getFloorPlanById = (state, id) => getFloorPlansById(state)[id] || {};
