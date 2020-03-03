import React    from 'react';
import {Router} from "@reach/router";
import  "./scss/main.scss";
import Home from './Home';
import Admin from './Admin';

class App extends React.Component {

  render() {
    return (
      <div>
        <Router>   
          <Home path='/' /> 
          <Admin path='/admin/' />
        </Router>    
      </div>
    );
  }

}

export default App;
