import {routerReducer} from 'react-router-redux'
import crudReducer from './common/crud/crudReducer'
import tagsReducer from './tags/tagReducer'

exports.INITIAL_STATE = {
    routing: {},
    isFetching: false,
    artifacts: {}
};


const artifactsCrudReducer = crudReducer("artifacts");
const tagsCrudReducer = crudReducer("tags");
const fireteamsReducer = crudReducer("fireteams");
const locatorsReducer = crudReducer("locators");
const floorPlansReducer = crudReducer("floorPlans");

exports.reducer = (oldState = INITIAL_STATE, action = null) => {
    return tagsReducer({
        ...oldState,
        routing: routerReducer(oldState.routing, action),
        artifacts: artifactsCrudReducer(oldState.artifacts, action),
        tags: tagsCrudReducer(oldState.tags, action),
        locators: locatorsReducer(oldState.locators, action),
        floorPlans: floorPlansReducer(oldState.floorPlans, action),
        fireteams: fireteamsReducer(oldState.fireteams, action)
    }, action);
};
