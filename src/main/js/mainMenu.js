import React from 'react'
import LiNavLink from './common/components/LiNavLink'
import {Switch, Route} from 'react-router'
import ArtifactsList from './artifacts/ArtifactsList'

exports.navBar = <ul className="nav navbar-nav">
    <LiNavLink exact to="/">Artifacts</LiNavLink>
    <LiNavLink to="/foo">Foo</LiNavLink>
    <LiNavLink to="/bar">Bar</LiNavLink>
</ul>;

exports.content = <Switch>
    <Route exact path="/">
        <div>
            <ArtifactsList/>
        </div>
    </Route>
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


