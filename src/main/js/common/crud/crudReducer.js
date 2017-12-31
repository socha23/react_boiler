import restActionNames from './crudActionNames'
import deepEqual from 'deep-equal'

export default function restReducer(resource) {

    const ActionNames = restActionNames(resource);

    return function reduce(state = {
        isFetching: false,
        isCreating: false,
        items: [],
        itemsById: {},
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
                    items: updateList(state.items, state.itemsById, action.items),
                    itemsById: updateIndex(state.items, state.itemsById, action.items),
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
                    items: [action.item, ...state.items],
                    itemsById: {...state.itemsById, [action.item.id]: action.item}
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


function updateList(oldList = [], oldById = {}, newList) {
    if (deepEqual(oldList, newList)) {
        return oldList;
    } else {
        return newList.map(item => deepEqual(item, oldById[item.id]) ? oldById[item.id] : item);
    }
}

function updateIndex(oldList = [], oldIdx = {}, newList) {
    if (deepEqual(oldList, newList)) {
        return oldIdx;
    }
    const result = {};
    newList.forEach(item => {
        result[item.id] = deepEqual(item, oldIdx[item.id]) ? oldIdx[item.id] : item;
    });
return result;
}



