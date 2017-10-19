import React from 'react'
import {withRouter, Switch, Route, Redirect} from 'react-router'
import LiNavLink from '../common/components/LiNavLink'
import {crudList} from '../common/crud/crudContainers'
import PageTemplate from '../templates/PageTemplate'
import ViewMapPage from './ViewMapPage'

let MapTabs = ({maps}) => <ul>
    {
        maps.map(m =>
            <LiNavLink key={m.id} to={"/maps/" + m.id}>{m.name}</LiNavLink>
        )
    }
</ul>;

const Content = ({maps}) => maps.length == 0 ? <span/> : <Switch>
    <Route exact path="/maps">
        <Redirect to={"/maps/" + maps[0].id }/>
    </Route>
    <Route path="/maps/:id" render={({match}) =>
        <ViewMapPage map={maps.find(i => i.id == match.params.id)}/>
    }>
    </Route>
</Switch>;

let MyPage = ({items}) => <PageTemplate
    pageNav={<MapTabs maps={items}/>}
    content={<Content maps={items}/>}
/>;

MyPage = withRouter(crudList({
    resource: "maps",
    onlyOnce: true
}, MyPage));


export default () => <MyPage/>
