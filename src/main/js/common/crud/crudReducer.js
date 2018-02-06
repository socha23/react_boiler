import restActionNames from './crudActionNames'
import deepEqual from 'deep-equal'
import {indexById} from '../resourceFunctions'

export default function restReducer(resource, params = {}) {

    params = {
        mapReceived: i => i,
        ...params
    }

    const ActionNames = restActionNames(resource);

    return function reduce(state = {
        isFetching: false,
        isCreating: false,
        receivedItems: [],
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
                return updateStateAfterReceive(state, action.items, params);
            case ActionNames.REQUEST_CREATE:
                return {
                    ...state,
                    isCreating: true
                };
            case ActionNames.CREATE_SUCCESS:
                return {
                    ...state,
                    isCreating: false,
                    items: [mapReceived(action.item, params), ...state.items],
                    itemsById: {...state.itemsById, [action.item.id]: mapReceived(action.item, state, params)}
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


function updateStateAfterReceive(state, receivedItems, params) {
    let newState = {...state}
    if (!deepEqual(state.receivedItems, receivedItems)) {
        newState.receivedItems = receivedItems;
        newState.items = [];
        for (let i = 0; i < receivedItems.length; i++) {
            if (state.receivedItems && i < state.receivedItems.length && deepEqual(state.receivedItems[i], receivedItems[i])) {
                newState.items[i] = state.items[i]
            } else {
                newState.items[i] = mapReceived(receivedItems[i], state, params)
            }
        }
        newState.itemsById = indexById(newState.items);
    }
    return newState
}

function mapReceived(item, state, params) {
    return params.mapReceived(item, state)
}



