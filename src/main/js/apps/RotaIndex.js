import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Switch, Route} from 'react-router'
import {NavLink} from 'react-router-dom'

import {ResourceLoader} from '../common/crud/crudContainers'

import {getAllFireteams} from '../fireteams/selectors'
import FireteamApp from '../fireteams/app/FireteamApp'

const ChooseFireteam = ({fireteams}) => <div>
    {fireteams.map(ft => <div key={ft.id}>
        <NavLink to={"/" + ft.id}
                 className="btn btn-primary btn-block btn-lg"
                 style={{margin: 5}}
        >{ft.name}</NavLink>
    </div>)}
</div>;

let RotaContent = ({fireteams}) => <Switch>
    <Route exact path="/">
        <ChooseFireteam fireteams={fireteams}/>
    </Route>
    {fireteams.map(ft =>
        <Route key={ft.id} path={"/" + ft.id}>
            <FireteamApp fireteam={ft}/>
        </Route>
    )}
</Switch>;

RotaContent = withRouter(connect((state) => ({
    fireteams: getAllFireteams(state)
}))(RotaContent));

export default () => <ResourceLoader resources={["artifacts", "floorPlans"]}>
    <ResourceLoader resources={["tags", "locators", "fireteams"]} interval={500}>
        <RotaContent/>
    </ResourceLoader>
</ResourceLoader>;

