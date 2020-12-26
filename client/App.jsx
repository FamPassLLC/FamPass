import React, { Component } from 'react';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import LoginPage from './components/LoginPage'
import FamilyPage from './components/FamilyPage';
import WelcomePage from './components/WelcomePage'
import styles from './componentStyles/style.css';
import ServicesPage from './components/ServicesPage';
import SignUpPage from './components/Signup';




class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
    <Switch>
      <Router>
        <div>
        <Route exact path="/">
          <LoginPage ></LoginPage>
        </Route>
          {/* <Route exact path="/">
            <WelcomePage/>
          </Route> */}

          <Route exact path="/family">
            <FamilyPage/>
          </Route>

          <Route exact path="/services">
            <ServicesPage/>
          </Route>
        </div>
      </Router>
    </Switch>
      
    );
  }
}
export default App;
