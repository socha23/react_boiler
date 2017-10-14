import React from 'react'
import PropTypes from 'prop-types'
import ArtifactForm from './ArtifactForm'
import ConfirmableLink from '../common/components/ConfirmableLink'
import growl from "../common/growl"

const ArtifactView = ({item, onEdit, onDelete}) => <div>
    <h3>{item.name}
        <div className="pull-right buttonRow">
            <a className="btn btn-primary" title="Zmień" onClick={onEdit}><i className="glyphicon glyphicon-edit"/></a>
            <ConfirmableLink className="btn btn-danger" onClick={onDelete}
                             title="Usuń"
                             message={"Czy na pewno usunąć " + item.name + "?"}>
                <i className="glyphicon glyphicon-remove"/>
            </ConfirmableLink>
        </div>
    </h3>


</div>;


export default class ArtifactCard extends React.Component {

    state = {
        edit: false
    };

    static propTypes = {
        animationTime: PropTypes.number,
        item: PropTypes.object,
        onUpdate: PropTypes.func,
        onDelete: PropTypes.func
    };

    onEdit = () => {
        this.setState({edit: true});
    };

    onUpdate = (item) => {
        this.setState({edit: false});
    };

    onDelete = () => {
        this.props.onDelete(this.props.item, () => {
            growl("Usunięto '" + this.props.item.name + "'");
        });
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
                return <ArtifactView item={this.props.item} onEdit={this.onEdit} onDelete={this.onDelete}/>
            }
        }
    }
}



