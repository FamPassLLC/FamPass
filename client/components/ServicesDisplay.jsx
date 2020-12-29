import React, { Component, useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import axios from 'axios';
import Image from 'react-bootstrap/Image';

function ServicesDisplay(props) {

  return (
    <div id='serviceProviders' className='d-flex'>
      <div id='provider'>
        <Image
          src={props.service_logo}
          alt='Netflix image'
          className='btn btn-raised shadow my-button w-xs bg-white d-flex mt-2 mx-4 justify-content-around'
          style={{
            width: '15vw',
            height: '15vw',
            border: 'solid 1px rgb(13, 59, 102)',
            borderRadius: '15px',
          }}
          onClick={() => (location.href = props.login_link)}
        />
        {/* </button> */}
        <div className='mt-2 mb-4 mx-4 align-items-start'>
          <a href='#' className='badge badge-secondary'>
            Family:{' ' + props.family_name}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ServicesDisplay;
