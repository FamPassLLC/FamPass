import React, { Component, useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import axios from 'axios';

function WelcomeDisplay() {
  //display logged in username
  const [userName, setUserName] = useState('');
  //   useEffect(() => {
  //     axios
  //     .get('')
  //     .then(result => {
  //       setUserName(result.data);
  //     })
  //     .catch(err => console.log(err));
  //   }, []);


  return (
    <div id="welcomeButtons" className='d-flex justify-content-center' style ={{margin: '10vw'}}>
      
      <div className='flex-column align-item-center mx-5' id="viewMyFamilies">
        <h5 className='text-center mb-4' style={{color: 'grey'}}>View my families</h5>
        <button
        className='btn btn-raised shadow my-button w-xs bg-white d-flex mt-2 mx-auto justify-content-around'
        style={{ width: '15vw', height: '15vw', borderRadius: '15px' }}
        > Image 1
        </button>
      </div>

      <div className='mx-5' id="viewSharedServices">
        <h5 className='text-center mb-4' style={{color: 'grey'}}>View shared with me</h5>
        <button
        className='btn btn-raised shadow my-button w-xs bg-white d-flex mt-2 mx-auto justify-content-around'
        style={{ width: '15vw', height: '15vw', borderRadius: '15px' }}
        >Image 2
        </button>
      </div>
      

    </div>
  );
}
export default WelcomeDisplay;