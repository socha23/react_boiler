import React from 'react'
import {Switch, Route, Redirect} from 'react-router'
import LiNavLink from '../common/components/LiNavLink'
import PageTemplate from '../templates/PageTemplate'
import BrowseTagsPage from './BrowseTagsPage'
import BrowseLocatorsPage from './BrowseLocatorsPage'

const menu = <ul>
    <LiNavLink to="/tags/internal/">Znaczniki wewnętrzne</LiNavLink>
    <LiNavLink to="/tags/locators/">Znaczniki zewnętrzne</LiNavLink>
</ul>;

const content = <Switch>
    <Route exact path="/tags"><Redirect to="/tags/internal"/></Route>
    <Route exact path="/tags/internal/:id?" component={BrowseTagsPage}/>
    <Route exact path="/tags/locators/:id?" component={BrowseLocatorsPage}/>
</Switch>;

export default () => <PageTemplate pageNav={menu} content={content}/>
