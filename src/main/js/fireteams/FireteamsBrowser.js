import React from 'react'
import {PropTypes} from 'prop-types'
import ConfirmableLink from '../common/components/ConfirmableLink'
import Modal from 'react-bootstrap-modal'
import growl from '../common/growl'

import FireteamsList from './FireteamsList'
import FireteamForm from './FireteamForm'


const EmptyFireteamsList = () => <div>
    <b>Nie zdefiniowano jeszcze żadnej roty</b>
</div>;

const ItemActionButtons = ({onDelete, onEdit}) => <div className="pull-right">
    <a className="btn btn-primary iconWithName" onClick={onEdit} title="Zmień">
        <i className="glyphicon glyphicon-edit"/>
        Zmień
    </a>

    <ConfirmableLink className="btn btn-danger iconWithName" onClick={onDelete}
                     title="Usuń"
                     message={"Czy na pewno usunąć?"}>
        <i className="glyphicon glyphicon-remove "/>
        Usuń
    </ConfirmableLink>
</div>;

const CommonButtons = ({onCreate}) => <span>
    <a className="btn btn-success iconWithName" onClick={onCreate} title="Dodaj">
        <i className="glyphicon glyphicon-plus"/>
        Dodaj
    </a>
</span>;

class FireteamModalEdit extends React.Component {

    static propTypes = {
        onOk: PropTypes.func,
        labelPopupTitle: PropTypes.string,
        labelPopupOk: PropTypes.string
    };

    static defaultProps = {
        onOk: (item, onSuccess, onError) => {onSuccess(item)},
        labelPopupTitle: "Edit",
        labelPopupOk: "OK"
    };

    state = {
        modalOpen: false,
        item: {}
    };

    showModal = (item) => {
        this.setState({modalOpen: true, item: item})
    };

    closeModal = () => {
        this.setState({modalOpen: false, item: {}})
    };

    onFormSubmit = (item, onSuccess, onError) => {
        this.props.onOk(item,
            (item) => {onSuccess(item); this.closeModal()},
            (errors) => {onError(errors)}
        );
    };

    render = () => <div>
        <Modal show={this.state.modalOpen} onHide={this.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{this.props.labelPopupTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FireteamForm onSubmit={this.onFormSubmit} item={this.state.item} labelPopupOk={this.props.labelPopupOk}/>
            </Modal.Body>
        </Modal>
    </div>

}

class FireteamsBrowser extends React.Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        onUpdate: PropTypes.func
    };

    static defaultProps = {
        onUpdate: (item, onSuccess, onError) => {onSuccess(item)},
        onCreate: (item, onSuccess, onError) => {onSuccess(item)}
    };

    state = {
        selected: {}
    };

    onSelect = (item) => {
        this.setState({selected: item})
    };

    onDelete = () => {
        this.props.onDelete(this.state.selected, () => {
            growl("Usunięto element")
        });
        this.setState({selected: {}})
    };

    onEdit = () => {
        this.modalEdit.showModal(this.state.selected);
    };

    onCreate = () => {
        this.modalCreate.showModal({});
    };

    render = () => (<div>
            {this.props.items.length > 0 ?
                <FireteamsList items={this.props.items} selected={this.state.selected} onSelect={this.onSelect}/>
                : <EmptyFireteamsList/>
            }

            <div className="buttonRow" style={{marginTop: 10}}>
                <CommonButtons onCreate={this.onCreate}/>
                {this.state.selected.id ?
                    <ItemActionButtons onDelete={this.onDelete} onEdit={this.onEdit}/>
                : <span/>}
            </div>

            <FireteamModalEdit ref={(modalEdit) => this.modalEdit = modalEdit}
                labelPopupTitle="Edycja roty"
                onOk={this.props.onUpdate}
            />

            <FireteamModalEdit ref={(modalCreate) => this.modalCreate = modalCreate}
                labelPopupTitle="Nowa rota"
                onOk={this.props.onCreate}
            />

        </div>
    )
}

export default FireteamsBrowser