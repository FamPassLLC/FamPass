import React, { Component } from 'react';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import LoginPage from './components/LoginPage'
import FamilyPage from './components/FamilyPage';
import styles from './componentStyles/style.css';




class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <Router>
        <div>
        <Route exact path="/">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/home">
          <FamilyPage></FamilyPage>
        </Route>
        </div>
      </Router>
    );
  }
}
export default App;
