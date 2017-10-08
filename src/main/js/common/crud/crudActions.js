import fetch from 'isomorphic-fetch'
import {growl} from '../growl'
import restActionNames from './crudActionNames'

const API_PATH = "/api/";

export default function restActions(resource) {

    const ActionNames = restActionNames(resource);

    function parseJSON(response) {
        return response.json()
    }

    function checkStatus(response) {
        if (response.status < 300) {
            return response
        } else {
            throw response
        }
    }

    // Fetch items

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

    // create item

    function createItemRequest() {
        return {
            type: ActionNames.REQUEST_CREATE
        }
    }

    function createItemSuccess(item) {
        return {
            type: ActionNames.CREATE_SUCCESS,
            item: item
        }
    }

    function createItemError(errors) {
        return {
            type: ActionNames.CREATE_ERROR,
            errors: errors
        }
    }

    function createItem(item) {
        return (dispatch) => {
            dispatch(createItemRequest());
            return fetch(API_PATH + resource, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(item)
            })
                .then(checkStatus)
                .then(parseJSON)
                .then(json => {
                    dispatch(createItemSuccess(json));
                }).catch(error => {
                    console.log(error);
                    error.json()
                        .then(json => {
                            var errors = {};
                            json.errors.forEach(e => {
                                errors[e.property] = e.message;
                            });
                            return errors;
                        })
                        .then(e => dispatch(createItemError(e)));
                    });
        }
    }

    return {
        fetchItems,
        fetchItemsIfNeeded,
        createItem
    }


}


