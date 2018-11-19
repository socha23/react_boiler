import React from 'react'
import {connect} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router'
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
            <ResourceLoader resources={["tags"]} interval={20} headers={{"OZAB-Fireteam": ft.id}}>
                <FireteamApp fireteam={ft}/>
            </ResourceLoader>
        </Route>
    )}
</Switch>;

RotaContent = withRouter(connect((state) => ({
    fireteams: getAllFireteams(state)
}))(RotaContent));

export default () => <ResourceLoader resources={["artifacts", "floorPlans"]}>
    <ResourceLoader resources={["locators"]} interval={5000}>
        <ResourceLoader resources={["fireteams"]} interval={1000}>
            <RotaContent/>
    </ResourceLoader>
    </ResourceLoader>
</ResourceLoader>;

