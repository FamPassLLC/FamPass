import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import WelcomeDisplay from './WelcomeDisplay';

function WelcomePage(props) {
  return (
    <div
      id='welcome-page'
      className='justify-content-start align-items-center d-flex flex-column'
      style={{ paddingTop: '15vh' }}
    >
      <div className='d-flex justify-content-end mt-10'>
        <p className='mb-0 mr-5 ml-2 display-4 mb-5'>
          Welcome,
          <span>
            <strong>{' ' + props.local_user.username}.</strong>
          </span>
        </p>
      </div>
      <WelcomeDisplay local_user={props.local_user.username} />
    </div>
  );
}
export default WelcomePage;
