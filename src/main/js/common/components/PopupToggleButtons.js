import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap-modal'
import ToggleButtons from './ToggleButtons'

class PopupToggleButtons extends React.Component {

    static propTypes = {
        items: PropTypes.array,
        selected: PropTypes.object,
        onSelectionChange: PropTypes.func,

        labelPopupTitle: PropTypes.string,
        labelPopupOk: PropTypes.string,
        labelNoSelection: PropTypes.string
    };

    static defaultProps = {
        labelPopupTitle: "Enter selection",
        labelPopupOk: "OK",
        labelNoSelection: "No selection"
    };

    state = {
        modalOpen: false,
        selected: this.props.selected || {}
    };

    componentWillReceiveProps(nextProps) {
        this.setState({selected: nextProps.selected || {}});
    };

    onSelectionChange = (selection) => {
        this.setState({selected: selection})
    };

    closeModal = () => {
        this.setState({modalOpen: false})
    };

    openModal = () => {
        this.setState({modalOpen: true, selected: this.props.selected})
    };

    onOk = () => {
        this.closeModal();
        this.props.onSelectionChange(this.state.selected);
    };

    createDescription = () => {
        let selected = this.props.selected || {};
        if (Object.keys(selected).length == 0) {
            return this.props.labelNoSelection
        } else {
            let result = [];
            this.props.items.forEach(i => {
                if (selected[i.id]) {
                    result.push(i.name);
                }
            });
            return result.join(", ");
        }
    };

    render() {
        return <div>
            <Modal show={this.state.modalOpen} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.labelPopupTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ToggleButtons items={this.props.items} selected={this.state.selected}
                                   onSelectionChange={this.onSelectionChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary" onClick={this.onOk}>{this.props.labelPopupOk}</button>
                </Modal.Footer>
            </Modal>

            <a style={{cursor: "pointer", display: "block"}} onClick={this.openModal}>{this.createDescription()}</a>
        </div>
    }
}


export default PopupToggleButtons