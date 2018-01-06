import {createSelector} from 'reselect'

export const getAllFireteams = state => state.fireteams.items || [];

export const getFireteamsAssignedTo = (state, targetTag) => getAllFireteams(state).filter(ft => ft.targetTagId == targetTag.id);
