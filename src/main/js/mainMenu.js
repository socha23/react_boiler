import React from 'react'
import LiNavLink from './common/components/LiNavLink'
import {Switch, Route, Redirect} from 'react-router'
import Artifacts from './artifacts/ArtifactsIndex'
import Tags from './tags/TagsIndex'

exports.navBar = <ul>
    <LiNavLink to="/artifacts"><i title="Zbiory" className="glyphicon glyphicon-th"/></LiNavLink>
    <LiNavLink to="/tags"><i title="Znaczniki" className="glyphicon glyphicon-tag"/></LiNavLink>
    <LiNavLink to="/foo"><i title="Użytkownicy" className="glyphicon glyphicon-user"/></LiNavLink>
    <LiNavLink to="/fire"><i title="Pożar!" className="glyphicon glyphicon-fire"/></LiNavLink>
</ul>;

exports.content = <Switch>
    <Route exact path="/">
        <Redirect to="/artifacts"/>
    </Route>
    <Route path="/artifacts/:artifactId?" component={Artifacts}/>
    <Route path="/tags" component={Tags}/>
</Switch>;


