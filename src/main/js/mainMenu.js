import React from 'react'
import LiNavLink from './common/components/LiNavLink'
import {Switch, Route, Redirect} from 'react-router'
import Artifacts from './artifacts/ArtifactsIndex'
import {ResourceLoader} from './common/crud/crudContainers'
import Tags from './tags/TagsIndex'
import Maps from './maps/MapsIndex'

exports.navBar = <ul>
    <LiNavLink to="/artifacts"><i title="Zbiory" className="glyphicon glyphicon-th"/></LiNavLink>
    <LiNavLink to="/tags"><i title="Znaczniki" className="glyphicon glyphicon-tag"/></LiNavLink>
    <LiNavLink to="/maps"><i title="Plany i mapy" className="glyphicon glyphicon-map-marker"/></LiNavLink>
    <LiNavLink to="/users"><i title="Użytkownicy" className="glyphicon glyphicon-user"/></LiNavLink>
    <LiNavLink to="/fire"><i title="Pożar!" className="glyphicon glyphicon-fire"/></LiNavLink>
</ul>;

exports.content = <ResourceLoader resources={["artifacts", "floorPlans"]}>
    <ResourceLoader resources={["tags", "locators"]} interval={1000}>
        <Switch>
            <Route exact path="/">
                <Redirect to="/artifacts"/>
            </Route>
            <Route path="/artifacts" component={Artifacts}/>
            <Route path="/tags" component={Tags}/>
            <Route path="/maps" component={Maps}/>
        </Switch>
        </ResourceLoader>
</ResourceLoader>;



