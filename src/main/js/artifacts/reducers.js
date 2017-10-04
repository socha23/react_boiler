import * as Actions from './actions'

export default function artifacts(state = {isFetching: false, projects: []}, action = null) {
    switch (action.type) {
        case Actions.REQUEST_ARTIFACTS:
            return {
                ...state,
                isFetching: true
            };
        case Actions.RECEIVE_ARTIFACTS:
            return {
                ...state,
                isFetching: false,
                items: action.items
            };
        default:
            return state;
    }
}
