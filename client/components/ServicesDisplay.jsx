import React, { Component, useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import axios from 'axios';

function ServicesDisplay() {

  return (
    <div id="serviceProviders" className='d-flex'>
      
      <div id="provider">
        <button
        className='btn btn-raised shadow my-button w-xs bg-white d-flex mt-2 mx-4 justify-content-around'
        style={{ width: '15vw', height: '15vw', border: 'solid 1px lightgrey', borderRadius: '15px' }}
        > Netflix
        </button>
        <div className='d-flex mt-2 mb-4 mx-4 align-items-start'>
          <a href="#" className="badge badge-secondary">User</a>
        </div>
      </div>

      <div id="provider">
        <button
        className='btn btn-raised shadow my-button w-xs bg-white d-flex mt-2 mx-4 justify-content-around'
        style={{ width: '15vw', height: '15vw', border: 'solid 1px lightgrey', borderRadius: '15px'}}
        > Spotify
        </button>
        <div className='d-flex mt-2 mb-4 mx-4 align-items-start'>
          <a href="#" className="badge badge-secondary">User</a>
        </div>
      </div>
      

    </div>
  );
}
export default ServicesDisplay;