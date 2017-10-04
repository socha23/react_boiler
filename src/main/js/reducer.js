import {routerReducer} from 'react-router-redux'
import artifactsReducer from './artifacts/reducers'


exports.INITIAL_STATE = {
    routing: {},
    isFetching: false,
    artifacts: {}
};

exports.reducer = (oldState = INITIAL_STATE, action = null) => {
    return {
        ...oldState,
        routing: routerReducer(oldState.routing, action),
        artifacts: artifactsReducer(oldState.artifacts, action)
    };
};
