import fetch from 'isomorphic-fetch'
import {growl} from '../growl'
import restActionNames from './crudActionNames'

const API_PATH = "/api/";

export default function restActions(resource) {
    const ActionNames = restActionNames(resource);
    function request() {
        return {
            type: ActionNames.REQUEST_ITEMS
        }
    }

    function receive(items) {
        return {
            type: ActionNames.RECEIVE_ITEMS,
            items: items
        }
    }

    function shouldFetch(state) {
        return !state.isFetching;
    }

    function fetchItems() {
        return function (dispatch) {
            dispatch(request());
            return fetch(API_PATH + resource + "?sort=id,desc") // spring data rest
                .then(response => response.json())
                .then(json => {
                    dispatch(receive(json._embedded[resource]));
                });
        }
    }

    function fetchItemsIfNeeded() {
        return (dispatch, getState) => {
            if (shouldFetch(getState()[resource])) {
                return dispatch(fetchItems())
            } else {
                return Promise.resolve()
            }
        }
    }

    return {
        fetchItems,
        fetchItemsIfNeeded
    }
}

