import restActionNames from './crudActionNames'

export default function restReducer(resource) {

    const ActionNames = restActionNames(resource);

    return function reduce(state = {isFetching: false, items: []}, action = null) {
        switch (action.type) {
            case ActionNames.REQUEST_ITEMS:
                return {
                    ...state,
                    isFetching: true
                };
            case ActionNames.RECEIVE_ITEMS:
                return {
                    ...state,
                    isFetching: false,
                    items: action.items
                };
            default:
                return state;
        }
    }
}


