import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import {push} from 'react-router-redux'


class Container extends React.Component {

    render() {
        return <h1>Artifacts container</h1>
    }
}

export default Container

/*
const mapStateToProps = (state, ownProps) => {
    let project = state.projects.find(p => p.id == ownProps.params.projectId);
    return {
        project: project,
        responders: (project && project.responders) ? project.responders.map((respId => state.responders[respId])) : []
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: (resp) => dispatch(push('/responders/' + ownProps.params.projectId + "/" + resp.id))
});


const RespondersPageContainer = connect(mapStateToProps, mapDispatchToProps)(RespondersPage);

export default RespondersPageContainer

*/