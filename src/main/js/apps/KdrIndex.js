import React from 'react'
import {withRouter, Switch, Route, Redirect} from 'react-router'
import {NavLink} from 'react-router-dom'

import {ResourceLoader} from '../common/crud/crudContainers'
import LiNavLink from '../common/components/LiNavLink'

import PageTemplate from '../templates/PageTemplate'
import PageNavTitleLi from '../templates/PageNavTitleLi'

import RescueInsidePage from '../rescue/RescueInsidePage'
import RescueAdminPage from '../rescue/RescueAdminPage'

let KdrTabs = () => <div>
    <ul>
        <PageNavTitleLi>OZAB - KDR</PageNavTitleLi>
        <LiNavLink exact to="/">Akcja ratunkowa</LiNavLink>
        <LiNavLink liStyle={{float: "right", position: "relative", left: -150}} to="/admin">Administracja</LiNavLink>
    </ul>
</div>;

const KdrContent = ({maps}) => <Switch>
    <Route exact path="/" component={RescueInsidePage}/>
    <Route path="/admin" component={RescueAdminPage}/>
</Switch>;

let MyPage = () => <KdrContent/>;

export default () => <ResourceLoader resources={["artifacts", "floorPlans"]}>
    <ResourceLoader resources={["tags", "locators", "fireteams"]} interval={500}>
        <MyPage/>
    </ResourceLoader>
</ResourceLoader>;

