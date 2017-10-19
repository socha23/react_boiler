import restActionNames from './crudActionNames'

export default function restReducer(resource) {

    const ActionNames = restActionNames(resource);

    return function reduce(state = {
        isFetching: false,
        isCreating: false,
        items: [],
        itemsTimestamp: null
    }, action = null) {
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
                    items: action.items,
                    itemsTimestamp: new Date()
                };
            case ActionNames.REQUEST_CREATE:
                return {
                    ...state,
                    isCreating: true
                };
            case ActionNames.CREATE_SUCCESS:
                return {
                    ...state,
                    isCreating: false,
                    items: [action.item, ...state.items]
                };
            case ActionNames.CREATE_ERROR:
                return {
                    ...state,
                    isCreating: false
                };

            default:
                return state;
        }
    }
}


