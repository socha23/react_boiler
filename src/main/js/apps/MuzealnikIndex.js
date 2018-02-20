import React from 'react'
import {Redirect, Route, Switch, withRouter} from 'react-router'
import LiNavLink from '../common/components/LiNavLink'
import {crudList, ResourceLoader} from '../common/crud/crudContainers'

import PageTemplate from '../templates/PageTemplate'
import PageNavTitleLi from '../templates/PageNavTitleLi'


import BrowseArtifactsPage from '../artifacts/BrowseArtifactsPage'
import CreateArtifactPage from '../artifacts/CreateArtifactPage'

import ViewFloorPlanPage from '../maps/ViewFloorPlanPage'
import ViewOutsidePage from '../maps/ViewOutsidePage'

import MuseumDescriptionPage from '../museumDescription/MuseumDescriptionPage'


let MuzealnikTabs = ({maps}) => <div>
    <ul>
        <PageNavTitleLi>OZAB - Muzealnik</PageNavTitleLi>
        <LiNavLink to="/artifacts/">Lista muzealiów</LiNavLink>
        {
            maps.map(m =>
                <LiNavLink key={m.id} to={"/maps/" + m.id}>{m.name}</LiNavLink>
            )
        }
        <LiNavLink to={"/maps/outside"}>Na zewnątrz</LiNavLink>
        <LiNavLink to={"/museumDescription"}>Opis obiektu</LiNavLink>
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
    <Route path="/museumDescription" component={MuseumDescriptionPage}/>
</Switch>;

let MyPage = ({items}) => <PageTemplate
    pageNav={<MuzealnikTabs maps={items}/>}
    content={<MuzealnikContent maps={items}/>}
/>;

MyPage = withRouter(crudList({
    resource: "floorPlans",
    onlyOnce: true
}, MyPage));

export default () => <ResourceLoader resources={["artifacts", "floorPlans", "museumDescriptions"]}>
    <ResourceLoader resources={["tags", "locators", "fireteams"]} interval={500}>
        <MyPage/>
    </ResourceLoader>
</ResourceLoader>;

