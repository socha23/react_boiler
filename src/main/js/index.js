import 'babel-polyfill'
import React, {PropTypes} from 'react'
import { render} from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import {createBrowserHistory} from 'history'
import thunkMiddleware from 'redux-thunk'
import {routerReducer, syncHistoryWithStore} from 'react-router-redux'
import MyRouter from './Routing'
import undoable from 'redux-undo'

const INITIAL_STATE = {
    routing: {},
    isFetching: false
};


const mainReducer = (oldState = INITIAL_STATE, action = null) => {
    return {
        ...oldState,
        routing: routerReducer(oldState.routing, action)
    };
};

const store = createStore(mainReducer, INITIAL_STATE, applyMiddleware(
    thunkMiddleware
));

const history = syncHistoryWithStore(createBrowserHistory(), store);


const Root = ({store, history}) => (
    <Provider store={store}>
        <MyRouter history={history} store={store}/>
    </Provider>
);

render((
    <Root store={store} history={history}/>
), document.getElementById('app'));
