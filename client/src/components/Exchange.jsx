import React from 'react';
import * as Config        from '../config.json';
import {navigate, Link}   from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import Form from 'react-bootstrap/Form';
import Dialog from './Dialog';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image'


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


  function AlertDismissible() {
    const [show, setShow] = React.useState(true);
  
    return (
      <>
        <Alert show={show} variant="success">
          <Alert.Heading>How's it going?!</Alert.Heading>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
            lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
            fermentum.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Close me ya'll!
            </Button>
          </div>
        </Alert>
      </>
    );
  }
  

class Exchange extends React.Component {
    
    state = {
        from          : '',
        to            : '',
        sendAmount    : 0,
        receiveAmount : 0,
        account       : '',
    };
    render() {
        return (
            
            <Form onSubmit={this.handleSubmit.bind(this)} className='exchange' >            

                <div className='row'>
                    <div className='col-3'> </div>
                    <div className='col-3'>                      

                        <Form.Group controlId="formFromOption">
                            <Form.Label>From</Form.Label>
                            <Form.Control as="select" onChange={this.handleFromUpdate.bind(this)}>
                                <option>Choose...</option>
                                <option style={{backgroundColor : 'black'}}>Sepa Deposit</option>
                                <option>Wire Transfer</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formHorizontalText">
                            <Form.Label column sm={10}>
                            Send Amount
                            </Form.Label>                 
                            <Form.Control type="text" placeholder="" onChange={this.handleSendAmountUpdate.bind(this)} />                    
                        </Form.Group>
                    </div>
                    <div className='col-3'>         

                        <Form.Group controlId="formToOption">
                            <Form.Label>To</Form.Label>
                            <Form.Control as="select" onChange={this.handleToUpdate.bind(this)}>
                                <option >Choose...</option>
                                <option><Image src='images/bitcoin_small.png' alt='' />Bitcoin</option>
                                <option>Litcoin</option>
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId="formHorizontalText">
                            <Form.Label column sm={10}>
                            Receive Amount
                            </Form.Label>                 
                            <Form.Control type="text" readOnly placeholder="0" onChange={this.handleReceiveAmountUpdate.bind(this)} />                    
                        </Form.Group>
                    </div>
                    <div className='col-3'> </div>
                </div>


                <div className='row'>
                    <div className='col-4'> </div>
                    <div className='col-4'>

                        <Form.Group controlId="formHorizontalText">
                            <Form.Label column sm={8}>
                            Account
                            </Form.Label>                 
                            <Form.Control type="text" placeholder="text" onChange={this.handleAccountUpdate.bind(this)} /> 
                                           
                        </Form.Group>
                        
                    </div>

                    <div className='col-4'></div>                                           
                    
                </div>


                <div className='row'>
                    <div className='col-6'> </div>
                    <div className='col-1'>
                        <Form.Group>                 
                            <Button type="submit">Send</Button>                    
                        </Form.Group>
                    </div>
                    <div className='col-5'> </div>
                </div>
                
            </Form>
            
        );
    }

    handleFromUpdate(e) {
        this.setState({from: e.target.value || null});
    }

    handleSendAmountUpdate(e) {
        this.setState({sendAmount: e.target.value || null});


    }

    handleToUpdate(e) {
        this.setState({to: e.target.value || null});
    }
    handleReceiveAmountUpdate(e) {
        this.setState({receiveAmount: e.target.value || null});
    }

    handleAccountUpdate(e){
        this.setState({account: e.target.value || null});
    }
    

    handleSubmit(e) {
        // Prevent the default form submit action
        e.preventDefault();
    
        // Perform a POST call for the new data
        fetch(urlToCurrentDomain(`${Config.newOrderAPI}`), {
          method : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( this.state ) 
        })
          .then (res  => {
            if (res.status >= 400) {
                alert('there was an error');
                throw new Error(res.statusText);
            }
            return (
                //alert('success')
                React.render (<AlertDismissible />)
                );
            //return res.json();
          })
          .then (json => navigate(`/`))
          .catch(err => {
            this.setState({reportedError: err.message || 'Unknown'});
          })
    
      }

}
export default Exchange;