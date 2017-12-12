import React, {PropTypes} from 'react'

import {Switch, Route, Redirect} from 'react-router'
import {BrowserRouter} from 'react-router-dom'

import MuzealnikIndex from './MuzealnikIndex'
import KdrIndex from './KdrIndex'


const AppChooser = () => <div className="well center-block" style={{marginTop: 100, width: 600}}>
    <h1>Proszę o wybór aplikacji</h1>
    <hr/>
    <a href={CONTEXT_PATH + "/muzealnik"} className="btn btn-lg btn-primary btn-block" >
        Muzealnik
    </a>
    <a href={CONTEXT_PATH + "/kdr"} className="btn btn-lg btn-primary btn-block">
        KDR
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
</Switch>;


export default AppSelect;