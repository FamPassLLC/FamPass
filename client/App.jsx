import React, { Component } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import { render } from "react-dom";
import FamilyPage from './components/FamilyPage';

class App extends Component {
    constructor() {
        super();

        this.state = {

        };        
    }

    render() {
      
        return (
        <Switch> 
          <Route exact path='/'>
          <div> Julie is the best interior designer!
              <div> Derek Lam models in wedding dresses!</div>
          </div>
          </Route>

          {/* <Route path='/'>
          <div>
            <LoginPage />
          </div>  
          </Route> */}

          
          {/* <Route path='/'>
          <div>
            <CreateAccountPage />
          </div>  
          </Route> */}

          <Route exact path='/'>
          <div>
            <FamilyPage />
          </div>  
          </Route>
          

        </Switch>  
        );
    };

    // const styles = {

    // }
  }
export default App;