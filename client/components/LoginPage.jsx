import React, { useState } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { render } from 'react-dom';
import { data } from 'jquery';

function LoginPage(props) {
  const history = useHistory();
  const [state, setState] = useState({
    username: '',
    password: '',
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  //this function submits log in info to server
  const sendDetailsToServer = (e) => {
    e.preventDefault();
    if (state.username.length && state.password.length) {
      const payload ={
        "username": state.username,
        "password": state.password,
      };

      fetch('http://localhost:8080/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            Authentication: 'true',
          }));
          redirectToHome();
          props.setLocalUser(state);
        }
      });
    } else {
      props.error('Please enter valid username and password');
    }
  };
  const redirectToHome = () => {
    history.push('/home');
  };
  // sign up button needs to be added to page and given this function
  const redirectToSignUp = () => {
    history.push('/signup');
  };
  return (
    <div className='loginPage text-center'>
      {/* <img class="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img> */}
      <br></br>
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <div>
        <form className="form-signin">
        <label htmlFor="username" className="sr-only">Email address</label>
          <input
            type='text'
            placeholder='Username'
            className="form-control"
            id='username'
            value={state.username}
            onChange={handleChange}
            required autoFocus>
            </input>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            type='password'
            placeholder='Password'
            id='password'
            value={state.password}
            onChange={handleChange}
            className="form-control" required>
            </input>
          <button className="btn btn-lg btn-primary btn-block" type="button" onClick={sendDetailsToServer}>Sign in</button>
          <a href="/signup">Sign Up</a>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
