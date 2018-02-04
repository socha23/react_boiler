import restActionNames from '../common/crud/crudActionNames'

import {tagColorsByTagId, tagTypeByTagId} from './tagHelpers'

const ActionNames = restActionNames("tags");

export default function reduce(state = {
    tagColorsById: {}
    }
    , action = null) {
        switch (action.type) {
            case ActionNames.RECEIVE_ITEMS:
                let artifacts = state.artifacts.items || [];
                let fireteams = state.fireteams.items || [];
                return {
                    ...state,
                    tagColorsById: tagColorsByTagId(action.items, artifacts, fireteams),
                    tagTypeById: tagTypeByTagId(action.items, artifacts, fireteams)
                };
            default:
                return state;
        }
    }



