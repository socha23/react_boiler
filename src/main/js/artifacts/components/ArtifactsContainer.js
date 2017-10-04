import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import {push} from 'react-router-redux'

var MyList = ({items}) => <div>
    <div>
            <h1>Artifacts container</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Weight</th>
                        <th>Bought on</th>
                    </tr>
                </thead>
                <tbody>
                {items.map(a => <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.weight}</td>
                    <td>{a.boughtOn}</td>
                    </tr>)
                }
                </tbody>

            </table>
        </div>
</div>;

class Container extends React.Component {

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return React.cloneElement(<MyList/>, this.props)
    }
}

const mapStateToProps = (state) =>({
    items: state.artifacts.items || []
});


const mapDispatchToProps = (dispatch) => ({
    onMount: () => dispatch(Actions.fetchArtifactsIfNeeded())
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
