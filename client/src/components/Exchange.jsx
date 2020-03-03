import React from 'react';
import * as Config        from '../config.json';
import {navigate, Link}   from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import Form from 'react-bootstrap/Form';
import Dialog from './Dialog';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
const $ = require('jquery');
const axios = require("axios");



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
            
            <Form onSubmit={this.handleSubmit.bind(this)} className='exchange' id='exchange' >            
                
                <div className='row'>
                    <p className='col-12 statusMessage'>{this.state.statusMessage}</p>
                </div>
                

                <div className='row'>
                    <div className='col-3'> </div>
                    <div className='col-3'>                      

                        <Form.Group controlId="formFromOption">
                            <Form.Label>From</Form.Label>
                            <Form.Control as="select" onChange={this.handleFromUpdate.bind(this)} id='from'>
                                <option>Choose...</option>
                                <option style={{backgroundColor : 'black'}}>Sepa Deposit</option>
                                <option>Wire Transfer</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formHorizontalText">
                            <Form.Label column sm={10}>
                            Send Amount
                            </Form.Label>                 
                            <Form.Control id='sendAmount' type="text" placeholder="" onChange={this.handleSendAmountUpdate.bind(this)} />                    
                        </Form.Group>
                    </div>
                    <div className='col-3'>         

                        <Form.Group controlId="formToOption">
                            <Form.Label>To</Form.Label>
                            <Form.Control as="select" onChange={this.handleToUpdate.bind(this)} id='to'>
                                <option >Choose...</option>
                                <option>Bitcoin</option>
                                <option>Litcoin</option>
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId="formHorizontalText">
                            <Form.Label column sm={10}>
                            Receive Amount
                            </Form.Label>                 
                            <Form.Control id='receiveAmount' type="text" readOnly placeholder="0" onChange={this.handleReceiveAmountUpdate.bind(this)} />                    
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
                            <Form.Control id='account' type="text" placeholder="text" onChange={this.handleAccountUpdate.bind(this)} /> 
                                           
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

    async handleSendAmountUpdate(e) {
        this.setState({sendAmount: e.target.value || null});
        

        const response =  await axios.get("http://localhost:3000/order/rate", {} );
        
        if( $('#to').val() == "Bitcoin" )
        {
          const rate = this.state.sendAmount * (1/response.data[0].btceur);
          $('#receiveAmount').val(rate.toFixed(3));
        }
        else if ( $('#to').val() == "Litcoin" )
        {
          const rate = this.state.sendAmount * (1/response.data[0].ltceur);
          $('#receiveAmount').val(rate.toFixed(2));
        }

        
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
    
    async handleSubmit(e)
    {
      e.preventDefault();
      const response =  await axios.post("http://localhost:3000/order/new", this.state );
      this.setState({statusMessage : 'Order Placed Successfully. Order Id: '+ response.data._id} ) 
      
      $('#from').val('');
      $('#to').val('');
      $('#sendAmount').val('');
      $('#receiveAmount').val('');
      $('#account').val('');
    }

}
export default Exchange;