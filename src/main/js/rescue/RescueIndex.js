import React from 'react'
import {Switch, Route, Redirect} from 'react-router'
import {NavLink} from 'react-router-dom'
import LiNavLink from '../common/components/LiNavLink'
import PageTemplate from '../templates/PageTemplate'

import RescueInsidePage from './RescueInsidePage'
import RescueOutsidePage from './RescueOutsidePage'
import RescueAdminPage from './RescueAdminPage'

const menu = <ul>
    <LiNavLink to="/rescue/inside/:id?">Akcja w muzeum</LiNavLink>
    <LiNavLink to="/rescue/outside/:id?">Na zewnątrz</LiNavLink>
    <LiNavLink liStyle={{float: "right", position: "relative", left: -150}} to="/rescue/admin">Administracja</LiNavLink>

</ul>;

const content = <Switch>
    <Route exact path="/rescue"><Redirect to="/rescue/inside"/></Route>
    <Route path="/rescue/inside" component={RescueInsidePage}/>
    <Route path="/rescue/outside" component={RescueOutsidePage}/>
    <Route path="/rescue/admin" component={RescueAdminPage}/>
</Switch>;

export default () => <PageTemplate pageNav={menu} content={content}/>
