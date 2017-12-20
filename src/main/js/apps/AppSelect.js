import React, {PropTypes} from 'react'

import {Switch, Route, Redirect} from 'react-router'
import {BrowserRouter} from 'react-router-dom'

import MuzealnikIndex from './MuzealnikIndex'
import KdrIndex from './KdrIndex'
import TestDashboardIndex from './TestDashboardIndex'


const AppChooser = () => <div className="well center-block" style={{marginTop: 100, width: 600}}>
    <h1>Proszę o wybór aplikacji</h1>
    <hr/>
    <a href={CONTEXT_PATH + "/muzealnik"} className="btn btn-lg btn-primary btn-block" >
        Muzealnik
    </a>
    <a href={CONTEXT_PATH + "/kdr"} className="btn btn-lg btn-primary btn-block">
        KDR
    </a>
    <a href={CONTEXT_PATH + "/test"} className="btn btn-lg btn-default btn-block">
        Panel testów
    </a>


</div>;


const AppSelect = () => <Switch>
    <Route path="/" exact component={AppChooser}/>
    <Route path="/muzealnik">
        <BrowserRouter basename={CONTEXT_PATH + "/muzealnik"}>
            <MuzealnikIndex/>
        </BrowserRouter>
    </Route>
    <Route path="/kdr">
        <BrowserRouter basename={CONTEXT_PATH + "/kdr"}>
            <KdrIndex/>
        </BrowserRouter>
    </Route>
    <Route path="/test">
        <BrowserRouter basename={CONTEXT_PATH + "/test"}>
            <TestDashboardIndex/>
        </BrowserRouter>
    </Route>
</Switch>;


export default AppSelect;