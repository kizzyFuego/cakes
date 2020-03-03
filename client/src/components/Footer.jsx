import React    from 'react';

class Footer extends React.Component {

  render() {
    return (
      <div className='footer'>
        <div className="text-center">
          <img src="images/sepa.png" alt='Sepa' className="img-fluid" style={{width:'80px'}}/>
          <img src="images/bitcoin.png" alt='Bitcoin' className="img-fluid"/>
          <img src="images/litcoin.png" alt='Litcoin' className="img-fluid"/>       
          <p>© 2020 All Right Reserve</p>
        </div>
        
        
      </div>
    );
  }

}
export default Footer;