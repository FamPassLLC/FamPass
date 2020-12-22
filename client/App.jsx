import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import FamilyPage from './components/FamilyPage';
import styles from './componentStyles/style.css';
class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <FamilyPage />
      </div>
      // <Switch>
      /* <Route exact path='/'>
          <div> Julie is the best interior designer!
              <div> Derek Lam models in wedding dresses!</div>
          </div>
          </Route> */

      /* <Route path='/'>
          <div>
            <LoginPage />
          </div>  
          </Route> */

      /* <Route path='/'>
          <div>
            <CreateAccountPage />
          </div>  
          </Route> */

      // <Route exact path='/'>

      /* </Route>
      </Switch> */
    );
  }

  // const styles = {

  // }
}
export default App;
