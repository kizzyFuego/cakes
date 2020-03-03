import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function ModalMessage(props) {
  const [show, setShow] = React.useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/*<Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>*/}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

  class Dialog extends React.Component { 
    
    render() {
      return (
        <ModalMessage title = {this.props.title}
        body = {this.props.body} />
      );
    }
  }
  export default Dialog;