import React from 'react'
import {Route, Switch} from 'react-router'

import {ResourceLoader} from '../common/crud/crudContainers'
import LiNavLink from '../common/components/LiNavLink'
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

export default () => <ResourceLoader resources={["floorPlans"]}>
    <ResourceLoader resources={["museumDescriptions", "artifacts"]} interval={5000}>
        <ResourceLoader resources={["locators", "fireteams"]} interval={1000}>
            <ResourceLoader resources={["tags"]} interval={20}>
                <MyPage/>
            </ResourceLoader>
        </ResourceLoader>
    </ResourceLoader>
</ResourceLoader>;

