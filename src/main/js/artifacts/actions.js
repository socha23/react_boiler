/*
 * action types
 */

import fetch from 'isomorphic-fetch'
import {growl} from '../common/growl'

const API_PATH = "/api/artifacts";

export const REQUEST_ARTIFACTS = 'REQUEST_ARTIFACTS';
function requestArtifacts() {
    return {
        type: REQUEST_ARTIFACTS
    }
}

export const RECEIVE_ARTIFACTS = 'RECEIVE_ARTIFACTS';

function receiveArtifacts(items) {
    return {
        type: RECEIVE_ARTIFACTS,
        items: items
    }
}

function shouldFetchArtifacts(state) {
    return !state.isFetching;
}

function fetchArtifacts() {
    return function (dispatch) {
        dispatch(requestArtifacts());
        return fetch(API_PATH + "?sort=id,desc") // spring data rest
            .then(response => response.json())
            .then(json => {
                dispatch(receiveArtifacts(json._embedded.artifacts));
            });
    }
}

export function fetchArtifactsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchArtifacts(getState().artifacts)) {
            return dispatch(fetchArtifacts())
        } else {
            return Promise.resolve()
        }
    }
}

