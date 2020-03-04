import React    from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {navigate, Link}   from '@reach/router';

//import $ from 'jquery';
const $ = require('jquery');
const axios = require("axios");

//const response = async () => await axios.get("http://localhost:3000/order/rate", { });
//console.log(response());

class Header extends React.Component {
  constructor(){
    super()
    this.state = {
    }
    this.getRate();
  }

  getRate = async () =>{
    const response =  await axios.get("http://localhost:3000/order/rate", {} );
    this.setState( {ltceur : response.data[0].ltceur} );
    this.setState( {btceur : response.data[0].btceur} );
  }

  

  render() {
    return (
      <div className='jumbotron header'>
        <div className='row headerButton'>
          <ButtonToolbar>
            <Link to='/'> <Button variant="outline-primary">Home </Button> </Link>
            <Link to='/admin'> <Button variant="outline-primary">Admin </Button> </Link>
            <Link to='/modifyOrder'><Button variant="outline-primary">Modify Order</Button></Link>
          </ButtonToolbar>
        </div>

        <div className='row'>
          <div className='col-12'>
            <h1 className='display-4 center fontStyle'>Cryptocurrency Exchange</h1>
            {/*<p>A basic React app showing how products can be rendered from a JSON object retrieved from a PHP script</p>*/}          
          </div>
          <p className=' col-12 ratesRead'>{'1 LTC = '+this.state.ltceur + ' Euros,         1 BTC = '+this.state.btceur+' Euros'}</p>   
        </div>
       
      </div>
    );

  }

}
export default Header;