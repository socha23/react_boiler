import React from 'react'

import {Route, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'

import contextPath from '../common/contextPath'

import MuzealnikIndex from './MuzealnikIndex'
import KdrIndex from './KdrIndex'
import RotaIndex from './RotaIndex'
import PocIndex from './PocIndex'
import TestDashboardIndex from './TestDashboardIndex'


const AppChooser = () => <div className="well center-block" style={{marginTop: 100, width: 600}}>
    <h1>Proszę o wybór aplikacji</h1>
    <hr/>
    <a href={contextPath() + "/muzealnik"} className="btn btn-lg btn-primary btn-block" >
        Muzealnik
    </a>
    <a href={contextPath() + "/kdr"} className="btn btn-lg btn-primary btn-block">
        KDR
    </a>
    <a href={contextPath() + "/rota"} className="btn btn-lg btn-primary btn-block">
        Rota
    </a>
    <a href={contextPath() + "/poc"} className="btn btn-lg btn-primary btn-block">
        Podsystem Oceny Ćwiczących
    </a>
    <a href={contextPath() + "/test"} className="btn btn-lg btn-default btn-block">
        Panel testów
    </a>


</div>;


const AppSelect = () => <Switch>
    <Route path="/" exact component={AppChooser}/>
    <Route path="/muzealnik">
        <BrowserRouter basename={contextPath() + "/muzealnik"}>
            <MuzealnikIndex/>
        </BrowserRouter>
    </Route>
    <Route path="/kdr">
        <BrowserRouter basename={contextPath() + "/kdr"}>
            <KdrIndex/>
        </BrowserRouter>
    </Route>
    <Route path="/rota">
        <BrowserRouter basename={contextPath() + "/rota"}>
            <RotaIndex/>
        </BrowserRouter>
    </Route>
    <Route path="/poc">
        <BrowserRouter basename={contextPath() + "/poc"}>
            <PocIndex/>
        </BrowserRouter>
    </Route>
    <Route path="/test">
        <BrowserRouter basename={contextPath() + "/test"}>
            <TestDashboardIndex/>
        </BrowserRouter>
    </Route>
</Switch>;


export default AppSelect;