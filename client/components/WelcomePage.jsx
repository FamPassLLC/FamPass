import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import WelcomeDisplay from './WelcomeDisplay';

function WelcomePage(props) {
  
  return (
    <div>
      <WelcomeDisplay local_user={props.local_user.username} />

      <div className='d-flex justify-content-end mt-10'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-people-fill align-self-center'
          viewBox='0 0 16 16'
        >
          <path
            fillRule='evenodd'
            d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'
          />
        </svg>
        <p className='mb-0 mr-5 ml-2'>
          Welcome,
          <span>
            <strong>{ props.local_user.username}.</strong>
          </span>
        </p>
      </div>
    </div>
    );
  }
export default WelcomePage;
