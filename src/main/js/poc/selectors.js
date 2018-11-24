import {createSelector} from 'reselect'
import moment from 'moment'

export const getAllExercises = state => state.pocExercises.items || [];

export const getSortedExercises = createSelector([getAllExercises],
    (exercises) => {
        return [...exercises].sort((e1, e2) => {return moment(e1.when).valueOf() - moment(e2.when).valueOf()})
    }
);


