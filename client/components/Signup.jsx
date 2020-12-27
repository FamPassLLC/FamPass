import React, { useState } from "react";
import { Switch, Route, Link , useHistory} from 'react-router-dom';
import { render } from "react-dom";
import { data } from "jquery";


function SignUpPage(props) {
  const history = useHistory();
  const [state, setState] = useState({
    username: "",
    password: "",
    visible: "hidden",
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
      fetch('http://localhost:8080/api/users/signup', {
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
            }))
            redirectToHome();
          }
          else {
            setState(prevState => ({
              ...prevState,
              visible: "visible"
            }))
          }
        })
    } else {
      props.error('Please enter valid username and password');
    }
  }
  const redirectToHome = () => {
    history.push('/home')
  }
    return (
      <div class='loginPage' class="text-center">
        <br></br>
        <div>
        <h1 class="h3 mb-3 font-weight-normal">Create Account</h1>
          <div id="nameAvailabiltiy" style={{visibility: state.visible, color: "red"}}>Username already in use </div>
          <form class="form-signin">
            <label for="username" class="sr-only">Email address</label>
            <input
              type='text'
              placeholder='Username'
              class="form-control"
              id='username'
              value={state.username}
              onChange={handleChange}
              required autofocus>
              </input>
            <label for="password" class="sr-only">Password</label>
            <input
              type='password'
              placeholder='Password'
              id='password'
              value={state.password}
              onChange={handleChange}
              class="form-control" required>
            </input>
            <button class="btn btn-lg btn-primary btn-block" type="button" onClick={sendDetailsToServer}>Sign Up</button>
        </form>
        </div>
      </div>
    );
};

export default SignUpPage;