import React, { useState } from 'react';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import LoginPage from './components/LoginPage';
import FamilyPage from './components/FamilyPage';
import WelcomePage from './components/WelcomePage';
import styles from './componentStyles/style.css';
import ServicesPage from './components/ServicesPage';
import SignUpPage from './components/Signup';

function App() {
  const [local_user, setLocalUser] = useState('');
  const [extFamily, setExtFamily] = useState([]);

  return (
    <Switch>
      <Router>
        <div>
          <Route exact path='/'>
            <LoginPage setLocalUser={setLocalUser}></LoginPage>
          </Route>
          <Route exact path='/signup'>
            <SignUpPage></SignUpPage>
          </Route>
          {/* after verification, login page routes to /home that renders WelcomePage */}
          <Route exact path='/home'>
            <WelcomePage local_user={local_user} />
          </Route>

          <Route exact path='/family'>
            <FamilyPage local_user={local_user} />
          </Route>

          <Route exact path='/services'>
            <ServicesPage
              local_user={local_user}
              extFamily={extFamily}
              setExtFamily={setExtFamily}
            />
          </Route>
        </div>
      </Router>
    </Switch>
  );
}

export default App;
