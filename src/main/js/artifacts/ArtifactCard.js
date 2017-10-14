import React from 'react'
import PropTypes from 'prop-types'
import ArtifactForm from './ArtifactForm'

const ArtifactView = ({item, onEdit}) => <div>
    <h3>{item.name}</h3>
    <a className="btn btn-primary" title="Zmień" onClick={onEdit}><i className="glyphicon glyphicon-edit"/></a>
</div>;


export default class ArtifactCard extends React.Component {

    state = {
        edit: false
    };

    static propTypes = {
        animationTime: PropTypes.number,
        item: PropTypes.object,
        onUpdate: PropTypes.func
    };

    onEdit = () => {
        this.setState({edit: true});
    };

    onUpdate = (item) => {
        this.setState({edit: false});
    };

    componentWillReceiveProps = (nextProps) => {
        setTimeout(() => {
            this.setState({edit: false});
        }, this.props.animationTime)
    };

    render() {
        if (this.props.item) {
            if (this.state.edit) {
                return <ArtifactForm item={this.props.item} onSubmit={this.onUpdate} submitText="Zapisz"/>
            } else {
                return <ArtifactView item={this.props.item} onEdit={this.onEdit}/>
            }
        } else {
            return <div></div>
        }
    }
}



