import React, { Component, useEffect, useState } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { render } from 'react-dom';
import axios from 'axios';

function SideBar(props) {
  //button to switch to other location
  const history = useHistory();
  const switchTo = (e) => {
    e.preventDefault();
    if (props.switchTo === 'View shared services') history.push('/services');
    else history.push('/family');
  };

  //generate profile icon
  const [profileIcon, setProfileIcon] = useState('');
  // useEffect(() => {
  //   axios
  //   .get('')
  //   .then(result => {
  //     setProfileIcon(result.data);
  //   })
  //   .catch(err => console.log(err));
  // }, []);

  //extract total number of user profile icons
  const [totalUsers, setTotalUsers] = useState([]);
  // useEffect(() => {
  //   axios
  //   .get('')
  //   .then(result => {
  //     setTotalUsers(result.data);
  //   })
  //   .catch(err => console.log(err));
  // }, []);

  return (
    <div
      style={{
        backgroundColor: 'rgb(13, 59, 102)',
        height: '100vh',
        border: 'solid 1px rgb(188, 198, 207)',
      }}
      className='d-flex flex-column align-items-center justify-content-start'
    >
      <div id='avatar' className='mt-5 pt-5 mb-3'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='70'
          height='70'
          fill='white'
          className='bi bi-person-circle'
          viewBox='0 0 16 16'
        >
          <path d='M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z' />
          <path fillRule='evenodd' d='M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
          <path
            fillRule='evenodd'
            d='M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z'
          />
        </svg>
      </div>

      <p className='text-center' style={{ color: 'white' }}>
        {props.local_user}
      </p>
      <p className='text-center' style={{ color: 'white' }}>
        Plan Type
      </p>

      <div id='totalUsers' className='mt-5' style={{ width: '80%' }}>
        <div className='d-flex justify-content-around mb-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='white'
            className='bi bi-person-fill'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='white'
            className='bi bi-person-fill'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='white'
            className='bi bi-person-fill'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
            />
          </svg>
        </div>

        <div className='d-flex justify-content-around mb-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='white'
            className='bi bi-person'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='white'
            className='bi bi-person'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='white'
            className='bi bi-person'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'
            />
          </svg>
        </div>

        <div className='d-flex justify-content-around'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='white'
            className='bi bi-person-fill'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='white'
            className='bi bi-person-fill'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='white'
            className='bi bi-person-fill'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
            />
          </svg>
        </div>
      </div>
      <h4 id='logo' className='mt-5'>
        FamPass
      </h4>
      <div className='d-flex flex-column align-items-center mt-5'>
        <button
          id='sideBarButton'
          onClick={switchTo}
          className='btn btn-outline-light'
        >
          {props.switchTo}
        </button>
      </div>
    </div>
  );
}
export default SideBar;
