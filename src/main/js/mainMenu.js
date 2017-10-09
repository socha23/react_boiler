import React from 'react'
import LiNavLink from './common/components/LiNavLink'
import {Switch, Route, Redirect} from 'react-router'
import Artifacts from './artifacts/ArtifactsMain'

exports.navBar = <ul>
    <LiNavLink to="/artifacts"><i title="Zbiory" className="glyphicon glyphicon-th"/></LiNavLink>
    <LiNavLink to="/foo"><i title="Użytkownicy" className="glyphicon glyphicon-user"/></LiNavLink>
    <LiNavLink to="/bar"><i title="Znaczniki" className="glyphicon glyphicon-tag"/></LiNavLink>
    <LiNavLink to="/fire"><i title="Pożar!" className="glyphicon glyphicon-fire"/></LiNavLink>
</ul>;

exports.content = <Switch>
    <Route exact path="/">
        <Redirect to="/artifacts"/>
    </Route>
    <Route path="/artifacts" component={Artifacts}/>
    <Route path="/foo">
        <div>
            FOOOO
        </div>
    </Route>
    <Route path="/bar">
        <div>
            BAAAR
        </div>
    </Route>
</Switch>;


