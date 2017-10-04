import 'babel-polyfill'
import React, {PropTypes} from 'react'
import { render} from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'
import Template from './templates/MainTemplate'
import {navBar, content} from './mainMenu'
import {INITIAL_STATE, reducer} from './reducer'

const store = createStore(reducer, INITIAL_STATE, applyMiddleware(
    thunkMiddleware
));

render((
    <Provider store={store}>
        <BrowserRouter>
            <Template navBar={navBar} content={content}/>
        </BrowserRouter>
    </Provider>
), document.getElementById('app'));
