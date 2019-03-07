import React from 'react';

import {Modal, Button} from 'react-bootstrap';
class ErrorModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            content: this.props.content,
            show: false
        };

        this.handleClose = this.handleClose.bind(this);
    }
    
    handleClose() {
        this.setState( {show: false} );
    }

    render() {
        return (
            <div>
                <Modal className="fixed-center" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{this.state.content}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ErrorModal;