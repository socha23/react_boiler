import {routerReducer} from 'react-router-redux'
import crudReducer from './common/crud/crudReducer'

exports.INITIAL_STATE = {
    routing: {},
    isFetching: false,
    artifacts: {}
};


const artifactsCrudReducer = crudReducer("artifacts");

exports.reducer = (oldState = INITIAL_STATE, action = null) => {
    return {
        ...oldState,
        routing: routerReducer(oldState.routing, action),
        artifacts: artifactsCrudReducer(oldState.artifacts, action)
    };
};
