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
      const payload = {
        username: state.username,
        password: state.password,
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
          sessionStorage.setItem('loggedInUser', state.username.toLowerCase());
          redirectToHome();
          props.setLocalUser(state);

          //memory of logged in username to persist
          // console.log(sessionStorage.getItem('loggedInUser'))
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
    <div
      id='loginbackground'
      className='loginPage text-center d-flex flex-column-reverse align-items-center justify-content-center'
    >
      <div className='col-10'>
        <form className='form-signin'>
          <label htmlFor='username' className='sr-only'>
            Username
          </label>
          <input
            type='text'
            placeholder='Username'
            className='form-control mb-3'
            id='username'
            value={state.username}
            onChange={handleChange}
            required
            autoFocus
          ></input>
          <label htmlFor='password' className='sr-only'>
            Password
          </label>
          <input
            type='password'
            placeholder='Password'
            id='password'
            value={state.password}
            onChange={handleChange}
            className='form-control mb-3'
            required
          ></input>
          <button
            className='btn btn-lg btn-primary btn-block'
            type='button'
            onClick={sendDetailsToServer}
          >
            Sign in
          </button>
          <a href='/signup'>Create account</a>
        </form>
      </div>

      {/* <img class="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img> */}
      <h1 className='h3 mb-3 mt-5 font-weight-normal'>
        - Welcome to FamPass -
      </h1>
    </div>
  );
}

export default LoginPage;
