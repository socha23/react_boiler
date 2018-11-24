import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import {crudActions} from '../common/crud/crudContainers'
import Panel from '../common/components/Panel'
import {getSortedExercises} from "./selectors";

const BrowseExercisesPage = ({items, selected}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-6 colWithSmallerGutter">
                <Panel>
                    <h1>Lista wykonanych ćwiczeń</h1>
                </Panel>
            </div>
            <div className="col-sm-6 colWithSmallerGutter">
                <Panel>
                    <h1>Szczegóły wybranego ćwiczenia</h1>
                </Panel>
            </div>
        </div>
    </div>;

class BrowseExercisesPageContainer extends React.Component {
    render = () => {
        console.log(this.props.items);
        console.log("selected", this.props.selected);
        return <BrowseExercisesPage items={this.props.items} selected={this.props.selected}/>
    }
}


const mapStateToProps = (state, ownProps) => {
    const items = getSortedExercises(state);
    return {
        items: items,
        selected: items.find(i => i.id == ownProps.match.params.id)
    }
};


export default withRouter(crudActions("pocExercises", connect(mapStateToProps)(BrowseExercisesPageContainer)));
