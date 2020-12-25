import React, { useState } from "react";
import { Switch, Route, Link , useHistory} from 'react-router-dom';
import { render } from "react-dom";
import { data } from "jquery";


function LoginPage(props) {
  const history = useHistory();
  const [state, setState] = useState({
    username: "",
    password: "",
  })
  const handleChange = (e) => {
    const {id, value} = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }
  const sendDetailsToServer = (e) => {
    e.preventDefault();
    if (state.username.length && state.password.length) {
      const payload ={
        "username": state.username,
        "password": state.password,
      }
      fetch('http://localhost:8080/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
        .then(res => {
          if (res.status === 200) {
            setState(prevState => ({
              ...prevState,
              'Authentication': 'true'
            }))
            redirectToHome();
          }
        })
    } else {
      props.error('Please enter valid username and password');
    }
  }
  const redirectToHome = () => {
    history.push('/home')
  }
  // sign up button needs to be added to page and given this function
  const redirectToSignUp = () => {
    history.push('/signup')
  }
    return (
      <div id="loginPage" class>
        <h1>Login page</h1>
        <div>
          <form>
            <input type="text" placeholder="Username" id="username" value={state.username} onChange={handleChange}></input>
            <input type="password" placeholder="Password" id="password" value={state.password} onChange={handleChange}></input>
            <button type="submit" onClick={sendDetailsToServer}>Login</button>
          </form>
        </div>
      </div>
    );
};

export default LoginPage;