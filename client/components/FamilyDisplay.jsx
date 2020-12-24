import React, { Component, useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import FamilyName from './FamilyName';
function FamilyDisplay() {
  //edit family name if necessary, update family name in db
  const [familyName, updateFamilyName] = useState('');
  //   useEffect(() => {
  //     Axios
  //     .get('')
  //     .then(result => {
  //       updateFamilyName(result.data);
  //     })
  //     .catch(err => console.log(err));
  //   }, []);

  //display total number of users in family
  const [totalUsers, displayTotalUsers] = useState('');
  //   useEffect(() => {
  //     Axios
  //     .get('')
  //     .then(result => {
  //       displayTotalUsers(result.data);
  //     })
  //     .catch(err => console.log(err));
  //   }, []);

  //display total number of services in family
  const [totalServices, displayTotalServices] = useState('');
  //   useEffect(() => {
  //     Axios.get('')
  //       .then((result) => {
  //         displayTotalServices(result.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  //button to add (create) new user in family
  //button to add (create) new service in family
  return (
    <div
      className='d-flex mb-5 justify-content-around'
      style={{ backgroundColor: 'rgb(196, 196, 196)', borderRadius: '15px' }}
    >
      <div className='py-4 col-4'>
        <FamilyName />
        <p className='mb-0 mt-2'># of users</p>
        <p># of services</p>
      </div>

      <div className=' py-4  col-4'>
        <div className='justify-content-around d-flex'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='currentColor'
            className='bi bi-person-plus-fill'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'
            />
          </svg>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='currentColor'
            className='bi bi-person-plus'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10zM13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'
            />
          </svg>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='currentColor'
            className='bi bi-person-plus-fill'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'
            />
          </svg>
        </div>
        <p className='text-center mt-3'>Other users</p>
        <div className='d-flex justify-content-end'>
          <button className='btn btn-primary mr-1'>+</button>
          <button className='btn btn-secondary mr-1'>-</button>
        </div>
      </div>

      <div className='col-4 py-4 '>
        <div className='d-flex justify-content-around'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='currentColor'
            className='bi bi-film'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0h8v6H4V1zm8 8H4v6h8V9zM1 1h2v2H1V1zm2 3H1v2h2V4zM1 7h2v2H1V7zm2 3H1v2h2v-2zm-2 3h2v2H1v-2zM15 1h-2v2h2V1zm-2 3h2v2h-2V4zm2 3h-2v2h2V7zm-2 3h2v2h-2v-2zm2 3h-2v2h2v-2z'
            />
          </svg>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='currentColor'
            className='bi bi-music-note-list'
            viewBox='0 0 16 16'
          >
            <path d='M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z' />
            <path fillRule='evenodd' d='M12 3v10h-1V3h1z' />
            <path d='M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z' />
            <path
              fillRule='evenodd'
              d='M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z'
            />
          </svg>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='currentColor'
            className='bi bi-facebook'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z'
            />
          </svg>
        </div>
        <p className='text-center mt-3'>Services</p>
        <div className='d-flex justify-content-end'>
          <button className='btn btn-primary mr-1'>+</button>
          <button className='btn btn-secondary mr-1'>-</button>
        </div>
      </div>
    </div>
  );
}
export default FamilyDisplay;
