import React from 'react'
import LiNavLink from './common/components/LiNavLink'
import {Switch, Route, Redirect} from 'react-router'
import ArtifactsList from './artifacts/ArtifactsList'
import CreateArtifactPage from './artifacts/CreateArtifactPage'

exports.navBar = <ul className="nav navbar-nav">
    <LiNavLink to="/artifacts">Artifacts</LiNavLink>
    <LiNavLink to="/foo">Foo</LiNavLink>
    <LiNavLink to="/bar">Bar</LiNavLink>
</ul>;

exports.content = <Switch>
    <Route exact path="/">
        <Redirect to="/artifacts"/>
    </Route>
    <Route exact path="/artifacts" component={ArtifactsList}/>
    <Route path="/artifacts/new" component={CreateArtifactPage}/>
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


