import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap-modal'

class Popup extends React.Component {

    static propTypes = {
        labelPopupTitle: PropTypes.string,
    };

    static defaultProps = {
        labelPopupTitle: "",
    };

    state = {
        modalOpen: false,
    };

    closeModal = () => {
        this.setState({modalOpen: false})
    };

    openModal = () => {
        this.setState({modalOpen: true})
    };

    render() {
        return <div>
            <Modal show={this.state.modalOpen} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.labelPopupTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
            </Modal>
        </div>
    }
}


export default Popup