import React, { Component, useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import axios from 'axios';

function ServicesDisplay(props) {
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

  //show external family sharing corresponding service
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
  // function removeService(props) {
  //   //handle delete service
  //   const handleDelete = props => {
  //     const service_name = props.service_name;
  //     axios
  //       .delete('/delete-service-password')
  //       .then(result => {
  //         console.log(result);
  //       })
  //       .catch(err => console.log(err));
  //   };

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
    <div id='serviceProviders' className='d-flex'>
      
      <div id='provider'>
        <button
        className='btn btn-raised shadow my-button w-xs bg-white d-flex mt-2 mx-4 justify-content-around'
        style={{ width: '15vw', height: '15vw', border: 'solid 1px rgb(13, 59, 102)', borderRadius: '15px' }}
        > {props.service}
        </button>
        <div className='mt-2 mb-4 mx-4 align-items-start'>
          <a href='#' className='badge badge-secondary'>Family:{props.family_name}</a>
          {/* <button className='btn btn-secondary btn-sm 
          d-flex justify-content-start mt-1'
          onClick={() => handleDelete(props)}
          >
            - Remove Service
          </button> */}
        </div>

      </div>
    </div>
    );
  }

export default ServicesDisplay;