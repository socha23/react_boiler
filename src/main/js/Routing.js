import React, {PropTypes, Component} from 'react'
import {Router, Route, IndexRoute, IndexRedirect} from 'react-router'

import {connect} from 'react-redux'

const Empty = ({children}) => <div>{children}</div>;

const HelloWorld = () => <h1>Hello, world!</h1>;


const MyRouter = ({store, history}) => (
    <Router history={history}>
        <Route path="/" component={HelloWorld}>
        </Route>
    </Router>
);

export default MyRouter