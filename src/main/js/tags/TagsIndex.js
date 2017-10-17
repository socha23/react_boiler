import React from 'react'
import {Switch, Route, Redirect} from 'react-router'
import LiNavLink from '../common/components/LiNavLink'
import PageTemplate from '../templates/PageTemplate'
import BrowseTagsPage from './BrowseTagsPage'

const menu = <ul>
    <LiNavLink to="/tags/:id?">Lista znaczników</LiNavLink>
</ul>;

const content = <Switch>
    <Route exact path="/tags/:id?" component={BrowseTagsPage}/>
</Switch>;

export default () => <PageTemplate pageNav={menu} content={content}/>
