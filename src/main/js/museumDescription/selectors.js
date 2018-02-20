import {createSelector} from 'reselect'


const getAllDescriptions = state => state.museumDescriptions.items || [];

export const getMuseumDescription = createSelector([getAllDescriptions],
    descriptions =>
        descriptions.length === 0 ? {} : descriptions[0]
);
