import React, { Component, useState, useEffect } from 'react';
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import { render } from 'react-dom';
import axios from 'axios';
import servicesImg from '../componentStyles/services.jpg';
import familyImg from '../componentStyles/family.jpg';

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
    <div id='welcomeButtons' className='d-flex justify-content-center mt-5'>
      <div className='flex-column align-item-center mx-5' id='viewMyFamilies'>
        <h5 className='text-center mb-4'>View my families</h5>
        <img
          id='servicesImg'
          onClick={redirectToFamily}
          style={{
            width: '15vw',
            height: '15vw',
            borderRadius: '15px',
            cursor: 'pointer',
            boxShadow: '5px 5px 7px rgb(108, 108, 108)',
          }}
          src={familyImg}
        />
      </div>

      <div
        className='mx-5 d-flex flex-column align-items-center'
        id='viewSharedServices'
      >
        <h5 className='text-center mb-4'>View shared services</h5>
        <img
          id='servicesImg'
          onClick={redirectToServices}
          style={{
            width: '15vw',
            height: '15vw',
            borderRadius: '15px',
            cursor: 'pointer',
            boxShadow: '5px 5px 7px rgb(108, 108, 108)',
          }}
          src={servicesImg}
        />
      </div>
    </div>
  );
}
export default WelcomeDisplay;
