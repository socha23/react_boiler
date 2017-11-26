import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware} from 'redux'
import {INITIAL_STATE, reducer} from './reducer'

const store = createStore(reducer, INITIAL_STATE, applyMiddleware(
    thunkMiddleware
));

export default store