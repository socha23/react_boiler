import restActionNames from './crudActionNames'

export default function restReducer(resource) {

    const ActionNames = restActionNames(resource);

    return function reduce(state = {
        isFetching: false,
        isCreating: false,
        createSuccess: false,
        createError: false,
        createFldErrors: {},
        items: []
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
                    items: action.items
                };
            case ActionNames.REQUEST_CREATE:
                return {
                    ...state,
                    createSuccess: false,
                    createError: false,
                    isCreating: true
                };
            case ActionNames.CREATE_SUCCESS:
                return {
                    ...state,
                    isCreating: false,
                    createSuccess: true,
                    createFldErrors: {},
                    items: [action.item, ...state.items]
                };
            case ActionNames.CREATE_ERROR:
                return {
                    ...state,
                    isCreating: false,
                    createError: true,
                    createFldErrors: action.errors
                };

            default:
                return state;
        }
    }
}


