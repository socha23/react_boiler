import {routerReducer} from 'react-router-redux'
import crudReducer from './common/crud/crudReducer'
import {nothingReceivedReducer} from './common/crud/nothingReceived'

exports.INITIAL_STATE = {
    routing: {},
    isFetching: false,
    artifacts: {},
    lastReceivedTimestamp: new Date()
};


const artifactsCrudReducer = crudReducer("artifacts");
const tagsCrudReducer = crudReducer("tags");
const fireteamsReducer = crudReducer("fireteams");
const locatorsReducer = crudReducer("locators");
const museumDescriptionsReducer = crudReducer("museumDescriptions");
const floorPlansReducer = crudReducer("floorPlans");

exports.reducer = (oldState = INITIAL_STATE, action = null) => {
    let state = nothingReceivedReducer(oldState, action);
    return {
        ...state,
        routing: routerReducer(state.routing, action),
        artifacts: artifactsCrudReducer(state.artifacts, action),
        tags: tagsCrudReducer(state.tags, action),
        locators: locatorsReducer(state.locators, action),
        floorPlans: floorPlansReducer(state.floorPlans, action),
        fireteams: fireteamsReducer(state.fireteams, action),
        museumDescriptions: museumDescriptionsReducer(state.museumDescriptions, action)
    };
};
