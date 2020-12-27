import React, { Component, useState, useEffect } from 'react';
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import { render } from 'react-dom';
import axios from 'axios';

function WelcomeDisplay(props) {
  //display logged in username
  const local_user = props.local_user;

  const history = useHistory();
  const redirectToFamily = (e) => {
    e.preventDefault();
    history.push('/family');
  };

  const redirectToServices = (e) => {
    e.preventDefault();
    history.push('/services');
  };

  return (
    <div
      id='welcomeButtons'
      className='d-flex justify-content-center'
      style={{ margin: '10vw', border: '0 1px 0 0' }}
    >
      <div className='flex-column align-item-center mx-5' id='viewMyFamilies'>
        <h5 className='text-center mb-4' style={{ color: 'grey' }}>
          View my families
        </h5>
        <button
          onClick={redirectToFamily}
          className='btn btn-raised shadow my-button w-xs bg-white d-flex mt-2 mx-auto justify-content-around'
          style={{
            width: '15vw',
            height: '15vw',
            borderRadius: '15px',
            border: 'solid 1px lightgrey',
          }}
        >
          
          Image 1
        </button>
      </div>

      <div className='mx-5' id='viewSharedServices'>
        <h5 className='text-center mb-4' style={{ color: 'grey' }}>
          View shared with me
        </h5>
        <button
          onClick={redirectToServices}
          className='btn btn-raised shadow my-button w-xs bg-white d-flex mt-2 mx-auto justify-content-around'
          style={{
            width: '15vw',
            height: '15vw',
            borderRadius: '15px',
            border: 'solid 1px lightgrey',
          }}
        >
          Image 2
        </button>
      </div>
    </div>
  );
}
export default WelcomeDisplay;
