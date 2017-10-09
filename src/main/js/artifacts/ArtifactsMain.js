import React from 'react'
import {Switch, Route, Redirect} from 'react-router'
import LiNavLink from '../common/components/LiNavLink'
import PageTemplate from '../templates/PageTemplate'

import ArtifactsPage from './ArtifactsPage'
import CreateArtifactPage from './CreateArtifactPage'

const menu = <ul>
    <LiNavLink exact to="/artifacts">Lista muzealiów</LiNavLink>
    <LiNavLink to="/artifacts/new">Dodaj nowy</LiNavLink>
</ul>;

const content = <Switch>
    <Route exact path="/artifacts" component={ArtifactsPage}/>
    <Route path="/artifacts/new" component={CreateArtifactPage}/>
</Switch>;

export default () => <PageTemplate pageNav={menu} content={content}/>
