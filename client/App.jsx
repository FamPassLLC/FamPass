import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import FamilyPage from './components/FamilyPage';
import ServicesPage from './components/ServicesPage';
import WelcomePage from './components/WelcomePage';
import styles from './componentStyles/style.css';

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <WelcomePage />
        {/* <FamilyPage /> */}
        {/*<ServicesPage />*/}
        
      </div>
    );
  }
}
export default App;
