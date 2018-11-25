import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import {crudActions} from '../common/crud/crudContainers'
import Panel from '../common/components/Panel'
import {getSortedExercises} from "./selectors";
import ExercisesList from "./ExercisesList";
import ExerciseDetails from "./ExerciseView";
import ImportExerciseButton from "./ImportExerciseButton";

const BrowseExercisesPage = ({items, selected, onSelectItem, onDelete}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-6 colWithSmallerGutter">
                <Panel>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <h1>Wykonane ćwiczenia</h1>
                        <ImportExerciseButton/>
                    </div>

                    <ExercisesList items={items} selected={selected} onSelectItem={onSelectItem}/>
                </Panel>
            </div>
            <div className="col-sm-6 colWithSmallerGutter">
                {selected ? <Panel>
                    <ExerciseDetails item={selected} onDelete={onDelete}/>
                </Panel> : <span/>
                }

            </div>
        </div>
    </div>;

const mapStateToProps = (state, ownProps) => {
    const items = getSortedExercises(state);
    return {
        items: items,
        selected: items.find(i => i.id == ownProps.match.params.id),
        onSelectItem: (i) => {ownProps.history.push("/exercises/" + i.id)}
    }
};


export default withRouter(crudActions("pocExercises", connect(mapStateToProps)(BrowseExercisesPage)));
