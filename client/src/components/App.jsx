import React    from 'react';
import {Router} from "@reach/router";
import  "./scss/main.scss";
import Home from './Home';
import Admin from './Admin';
import ModifyOrder from './ModifyOrder';

class App extends React.Component {

  render() {
    return (
      <div>
        <Router>   
          <Home path='/' /> 
          <Admin path='/admin/' />
          <ModifyOrder path='/modifyOrder' />
        </Router>    
      </div>
    );
  }

}

export default App;
