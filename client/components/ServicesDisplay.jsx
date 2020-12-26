import React, { Component, useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import axios from 'axios';

function ServicesDisplay() {
  //add service provider
  const [serviceProvider, setServiceProvider] = useState('');
  //   useEffect(() => {
  //     axios
  //     .get('')
  //     .then(result => {
  //       setServiceProvider(result.data);
  //     })
  //     .catch(err => console.log(err));
  //   }, []);

  //show user sharing corresponding service
  const [userShare, setUserShare] = useState('');
  //   useEffect(() => {
  //     axios
  //     .get('')
  //     .then(result => {
  //       setUserShare(result.data);
  //     })
  //     .catch(err => console.log(err));
  //   }, []);

  //remove service
  const [xService, setXService] = useState('');
  //   useEffect(() => {
  //     axios
  //     .get('')
  //     .then(result => {
  //       setXService(result.data);
  //     })
  //     .catch(err => console.log(err));
  //   }, []);

  //open service on its webpage
  const [openService, setOpenService] = useState('');
  //   useEffect(() => {
  //     axios.get('')
  //       .then((result) => {
  //         setOpenService(result.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

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