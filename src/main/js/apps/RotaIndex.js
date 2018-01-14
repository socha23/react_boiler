import React from 'react'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router'
import {NavLink} from 'react-router-dom'

import {ResourceLoader} from '../common/crud/crudContainers'

import {getAllFireteams, getFireteamById} from '../fireteams/selectors'

const ChooseFireteam = ({fireteams}) => <div>
    {fireteams.map(ft => <div key={ft.id}>
        <NavLink to={"/" + ft.id}
                 className="btn btn-primary btn-block btn-lg"
                 style={{margin: 5}}
        >{ft.name}</NavLink>
    </div>)}
</div>;

let FireteamApp = ({fireteam}) => <div>
    <h1>Fireteam app</h1>
    <h3>{fireteam.name}</h3>
</div>;

FireteamApp = connect((state, ownProps) => ({
    fireteam: getFireteamById(state, ownProps.fireteamId) || {}
}))(FireteamApp);


let RotaContent = ({fireteams}) => <Switch>
    <Route exact path="/">
        <ChooseFireteam fireteams={fireteams}/>
    </Route>
    <Route path="/:id" render={({match}) =>
        <FireteamApp fireteamId={match.params.id}/>
    }/>
</Switch>;

RotaContent = connect((state) => ({
    fireteams: getAllFireteams(state)

}))(RotaContent);

export default () => <ResourceLoader resources={["artifacts", "floorPlans"]}>
    <ResourceLoader resources={["tags", "locators", "fireteams"]} interval={500}>
        <RotaContent/>
    </ResourceLoader>
</ResourceLoader>;

