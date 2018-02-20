import fetch from 'isomorphic-fetch'
import {growl} from '../growl'
import restActionNames from './crudActionNames'
import contextPath from '../contextPath'

const API_PATH = contextPath() + "/api/";

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

    function shouldFetch(state = {}, options = {
        onlyOnce: false,
        maxAge: 0
    }) {
        if (state.isFetching) {
            return false;
        } else if (options.onlyOnce && state.itemsTimestamp) {
            return false;
        } else if (state.itemsTimestamp && options.maxAge
            && (new Date() - state.itemsTimestamp) / 1000 < options.maxAge) {
            return false;
        } else {
            return true;
        }
    }

    function fetchItems() {
        return function (dispatch) {
            dispatch(request());
            return fetch(API_PATH + resource + "?sort=id,desc&size=1000") // spring data rest
                .then(checkStatus).catch(error => {
                    console.error(error);
                    error.json()
                        .then(json => {
                            console.error(json);
                            window.alert(json.message);
                        })
                })
                .then(parseJSON)
                .then(json => {
                    dispatch(receive(json._embedded[resource]));
                });
        }
    }

    function loadItems(options) {
        return (dispatch, getState) => {
            if (shouldFetch(getState()[resource], options)) {
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

    function createItem(item, onSuccess = () => {
    }, onError = () => {
    }) {
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
                    onSuccess(json);
                }).catch(error => {
                    console.log(error);
                    error.json()
                        .then(json => {
                            dispatch(createItemError(json.errors));
                            onError(json.errors);
                        })
                });
        }
    }

    // deleteItem

    function deleteItemRequest() {
        return {
            type: ActionNames.REQUEST_DELETE
        }
    }

    function deleteItemSuccess(item) {
        return {
            type: ActionNames.DELETE_SUCCESS,
            item: item
        }
    }

    function deleteItemError(item) {
        return {
            type: ActionNames.DELETE_ERROR,
            item: item
        }
    }

    function deleteItem(item, onSuccess) {
        return (dispatch) => {
            dispatch(deleteItemRequest());
            return fetch(item._links.self.href, {
                method: "DELETE"
            })
                .then(checkStatus)
                .then(() => {
                    dispatch(deleteItemSuccess(item));
                    dispatch(loadItems());
                    onSuccess(item);
                }).catch(error => {
                    console.log(error);
                    dispatch(deleteItemError(item));
                });
        }
    }

    // update item

    function updateItemRequest() {
        return {
            type: ActionNames.REQUEST_UPDATE
        }
    }

    function updateItemSuccess(item) {
        return {
            type: ActionNames.UPDATE_SUCCESS,
            item: item
        }
    }

    function updateItemError(errors) {
        return {
            type: ActionNames.UPDATE_ERROR,
            errors: errors
        }
    }

    function updateItem(item, onSuccess = () => {
    }, onError = () => {
    }) {
        return (dispatch) => {
            dispatch(updateItemRequest());
            return fetch(item._links.self.href, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(item)
            })
                .then(checkStatus)
                .then(parseJSON)
                .then(json => {
                    dispatch(updateItemSuccess(json));
                    dispatch(loadItems());
                    onSuccess(json);
                }).catch(error => {
                    console.log(error);
                    error.json()
                        .then(json => {
                            dispatch(updateItemError(json.errors));
                            onError(json.errors);
                        });
                });
        }
    }


    return {
        receive,
        loadItems,
        createItem,
        deleteItem,
        updateItem
    }


}


