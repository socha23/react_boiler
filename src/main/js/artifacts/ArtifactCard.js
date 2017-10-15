import React from 'react'
import PropTypes from 'prop-types'
import ArtifactForm from './ArtifactForm'
import ArtifactView from './ArtifactView'
import growl from "../common/growl"

export default class ArtifactCard extends React.Component {

    state = {
        edit: false
    };

    static propTypes = {
        animationTime: PropTypes.number,
        item: PropTypes.object,
        createMode: PropTypes.bool,
        onSubmit: PropTypes.func,
        onDelete: PropTypes.func
    };

    onEdit = () => {
        this.setState({edit: true});
    };

    onSubmit = (item, onSuccess, onError) => {
        this.props.onSubmit(item, (item) => {
            onSuccess(item);
            this.setState({edit: false});
            growl("Zapisano zmiany");
        }, (errors) => {
            onError(errors);
            growl("Wystąpiły błędy");

        });
    };

    onDelete = () => {
        this.props.onDelete(this.props.item, () => {
            growl("Usunięto '" + this.props.item.name + "'");
        });
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({edit: false});
    };


    render() {
        if (this.props.createMode || this.state.edit) {
            return <ArtifactForm
                createMode={this.props.createMode}
                item={this.props.item}
                onSubmit={this.onSubmit}
                submitText="Zapisz"
            />
        } else {
            return <ArtifactView
                item={this.props.item}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
            />
        }
    }
}



