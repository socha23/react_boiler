import React from 'react'
import {withRouter, Switch, Route, Redirect} from 'react-router'
import LiNavLink from '../common/components/LiNavLink'
import {NavLink} from 'react-router-dom'
import {crudList} from '../common/crud/crudContainers'

import PageTemplate from '../templates/PageTemplate'
import PageNavTitleLi from '../templates/PageNavTitleLi'
import {ResourceLoader} from '../common/crud/crudContainers'


import BrowseArtifactsPage from '../artifacts/BrowseArtifactsPage'
import CreateArtifactPage from '../artifacts/CreateArtifactPage'

import ViewFloorPlanPage from '../maps/ViewFloorPlanPage'
import ViewOutsidePage from '../maps/ViewOutsidePage'


let MuzealnikTabs = ({maps}) => <div>
    <ul>
        <PageNavTitleLi>OZAB - Muzealnik</PageNavTitleLi>
        <LiNavLink exact to="/artifacts/:id?">Lista muzealiów</LiNavLink>
        {
            maps.map(m =>
                <LiNavLink key={m.id} to={"/maps/" + m.id}>{m.name}</LiNavLink>
            )
        }
        <LiNavLink to={"/maps/outside"}>Na zewnątrz</LiNavLink>
    </ul>
</div>;

const MuzealnikContent = ({maps}) => <Switch>
    <Route exact path="/">
        <Redirect to="/artifacts"/>
    </Route>
    <Route exact path="/artifacts/:id?" component={BrowseArtifactsPage}/>
    <Route path="/artifacts/new" component={CreateArtifactPage}/>
    <Route exact path="/maps">
        {maps.length == 0 ? <span/> : <Redirect to={"/maps/" + maps[0].id }/>}
    </Route>
    <Route path="/maps/outside/:locatorId?" render={({match}) =>
        <ViewOutsidePage locatorId={match.params.locatorId}/>
    }/>
    <Route path="/maps/:id/:tagId?" render={({match}) =>
        <ViewFloorPlanPage map={maps.find(i => i.id == match.params.id)} tagId={match.params.tagId}/>
    }/>
</Switch>;

let MyPage = ({items}) => <PageTemplate
    pageNav={<MuzealnikTabs maps={items}/>}
    content={<MuzealnikContent maps={items}/>}
/>;

MyPage = withRouter(crudList({
    resource: "floorPlans",
    onlyOnce: true
}, MyPage));

export default () => <ResourceLoader resources={["artifacts", "floorPlans"]}>
    <ResourceLoader resources={["tags", "locators", "fireteams"]} interval={1000}>
        <MyPage/>
    </ResourceLoader>
</ResourceLoader>;

