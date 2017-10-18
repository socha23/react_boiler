import React from 'react'
import {Switch, Route, Redirect} from 'react-router'
import LiNavLink from '../common/components/LiNavLink'
import PageTemplate from '../templates/PageTemplate'
import BrowseMapsPage from './BrowseMapsPage'

const menu = <ul>
    <LiNavLink to="/maps/:id?">Lista map</LiNavLink>
</ul>;

const content = <Switch>
    <Route exact path="/maps/:id?" component={BrowseMapsPage}/>
</Switch>;

export default () => <PageTemplate pageNav={menu} content={content}/>
