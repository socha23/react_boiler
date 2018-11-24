import React from 'react'
import {Redirect, Route, Switch, withRouter} from 'react-router'
import LiNavLink from '../common/components/LiNavLink'
import {ResourceLoader} from '../common/crud/crudContainers'

import PageTemplate from '../templates/PageTemplate'
import PageNavTitleLi from '../templates/PageNavTitleLi'


import BrowseExercisesPage from '../poc/BrowseExercisesPage'


let PocTabs = ({maps}) => <div>
    <ul>
        <PageNavTitleLi>OZAB - Podsystem Oceny Ćwiczących</PageNavTitleLi>
        <LiNavLink to="/exercises/">Wykonane ćwiczenia</LiNavLink>
    </ul>
</div>;

const PocContent = () => <Switch>
    <Route exact path="/">
        <Redirect to="/exercises"/>
    </Route>
    <Route exact path="/exercises/:id?" component={BrowseExercisesPage}/>
</Switch>;

let MyPage = ({items}) => <ResourceLoader resources={["pocExercises"]} interval={3000}>
    <PageTemplate
        pageNav={<PocTabs maps={items}/>}
        content={<PocContent maps={items}/>}/>
</ResourceLoader>;

export default withRouter(MyPage);

