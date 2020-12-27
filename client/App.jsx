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
    this.state = {
      currentUser: null,
      extFamily: [],
      extFamilyService: []
  };
  this.setUser = this.setUser.bind(this);
  this.setExtFamily = this.setExtFamily.bind(this);
}
  setUser(username) {
    this.setState({currentUser: username}) 
  };

  //GET request that identifies families that user is a member of
  setExtFamily() {
    fetch('/families')
    .then(response => {
      return response.json();
    })
    .then(data => {
      const userFams = data.filter(el => el.username === this.state.currentUser)
      .map(el => el.family_name);
      this.setState({extFamily: userFams})
    })
    //GET request that identifies services provided by families that user is a member of
    .then(() => {
      fetch('/services/get-login-info')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const familyServices = data.filter(el => this.state.extFamily.includes(el.family_name));
        this.setState({extFamilyService: familyServices})
      })
    })
    .catch(err => console.log(err))
  };

  render() {
    return (
    <Switch>
      <Router>
        <div>
        <Route exact path="/">
          <LoginPage userInput={this.setUser}/>
        </Route>

          <Route exact path="/home">
            <WelcomePage currentUser={this.state.currentUser}
            setExtFamily={this.setExtFamily}  
            />
          </Route>

          <Route exact path="/family">
            <FamilyPage currentUser={this.state.currentUser}/>
          </Route>

          <Route exact path="/services">
            <ServicesPage currentUser={this.state.currentUser}
            extFamilyService={this.state.extFamilyService}
            />
          </Route>

        </div>
      </Router>
    </Switch>
      
    );
  }
}
export default App;
