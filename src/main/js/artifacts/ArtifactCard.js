import React from 'react'
import PropTypes from 'prop-types'
import ArtifactForm from './ArtifactForm'

const ArtifactView = ({item = {}, onEdit}) => <div>
    <h3>{item.name}</h3>
    <a className="btn btn-primary" title="Zmień" onClick={onEdit}><i className="glyphicon glyphicon-edit"/></a>
</div>;


class ArtifactCard extends React.Component {

    state = {
        edit: false
    };

    onEdit = () => {
        this.setState({edit: true});
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({edit: false});
    };

    render() {
        if (this.state.edit) {
            return <ArtifactForm item={this.props.item} onSubmit={this.onUpdate} submitText="Zapisz"/>
        } else {
            return <ArtifactView item={this.props.item} onEdit={this.onEdit}/>
        }
    }
}

export default ArtifactCard

