import React from 'react'
import {Switch, Route, Redirect} from 'react-router'
import {NavLink} from 'react-router-dom'
import LiNavLink from '../common/components/LiNavLink'
import PageTemplate from '../templates/PageTemplate'

import ArtifactsPage from './ArtifactsPage'
import CreateArtifactPage from './CreateArtifactPage'

const menu = <ul>
    <LiNavLink exact to="/artifacts/:id?">Lista muzealiów</LiNavLink>
    <li>
        <NavLink to="/artifacts/new">Dodaj nowy</NavLink>
    </li>

</ul>;

const content = <Switch>
    <Route exact path="/artifacts/:id?" component={ArtifactsPage}/>
    <Route path="/artifacts/new" component={CreateArtifactPage}/>
</Switch>;

export default () => <PageTemplate pageNav={menu} content={content}/>
