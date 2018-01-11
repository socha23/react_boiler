import {createSelector} from 'reselect'

export const getFloorPlans = state => state.floorPlans.items || [];
