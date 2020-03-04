import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const $ = require('jquery');
const axios = require("axios");
  
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
                            <Form.Control id='receiveAmount' type="text" value={this.state.receiveAmount} readOnly placeholder="0" onChange={this.handleReceiveAmountUpdate.bind(this)} />                    
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
          this.setState({receiveAmount: rate.toFixed(3)});
          //$('#receiveAmount').val(rate.toFixed(3));
        }
        else if ( $('#to').val() == "Litcoin" )
        {
          const rate = this.state.sendAmount * (1/response.data[0].ltceur);
          //$('#receiveAmount').val(rate.toFixed(2));
          this.setState({receiveAmount: rate.toFixed(2)});
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