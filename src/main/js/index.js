import 'babel-polyfill'
import React, {PropTypes} from 'react'
import { render} from 'react-dom'
import { Provider } from 'react-redux'
import {Switch, Route, Redirect} from 'react-router'
import thunkMiddleware from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'
import { createStore, applyMiddleware} from 'redux'
import {INITIAL_STATE, reducer} from './reducer'

import AppSelect from './apps/AppSelect'

const store = createStore(reducer, INITIAL_STATE, applyMiddleware(
    thunkMiddleware
));

render((
    <Provider store={store}>
        <BrowserRouter basename={CONTEXT_PATH}>
            <AppSelect/>
        </BrowserRouter>
    </Provider>
), document.getElementById('app'));
