import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
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
      <div>
        <LoginPage></LoginPage>
      </div>
    );
  }
}
export default App;
