import React, { Component, useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import FamilyName from './FamilyName';
import FamilyMembers from './FamilyMembers';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

function FamilyDisplay(props) {
  //switch states of modal being closed or open
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //state to keep track of the modal being open or closed
  const [show, setShow] = useState(false);
  //state to keep track of the form for changing family name being filled out or empty
  const [validated, setValidated] = useState(false);
  // //state to keep track of total families
  // const [newMember, setNewMember] = useState('');

  //submit new name to database
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    //if the form is not filled out, not allow to submit
    if (form.checkValidity() === false) {
      //confirm form input is filled out
      setValidated(true);
    }
  };
  // const handleInput = ({ target: { value } }) => {
  //   //listen for new input and assign that to new name
  //   setNewMember(value);
  // };

  //handle delete family
  const handleDelete = (props) => {
    const family_name = props.family_name;
    axios
      .delete(`/api/families/deletefamily/${family_name}`)
      .then((result) => {})
      .catch((err) => console.log(err));
  };

  return (
    <div
      id='familyName'
      className='d-flex mb-5 justify-content-around'
      style={{ border: 'solid 1px rgb(13, 59, 102)', borderRadius: '15px' }}
    >
      <div className='py-2 col-4'>
        <FamilyName family_name={props.family_name} className="mt-3 mr-3"/>
        <p className='mb-0 mt-2'># of users</p>
        <p># of services</p>
        <button
          className='btn btn-secondary btn-sm'
          onClick={() => handleDelete(props)}
        >
          - Remove family
        </button>
      </div>

      <FamilyMembers
        local_user={props.local_user.username}
        family_name={props.family_name}
        handleShow={handleShow}
        show={show}
        handleClose={handleClose}
        validated={validated}
        handleSubmit={handleSubmit}
      />

      <div
        id='services'
        className='col-4 py-4'
        style={{ color: 'rgb(13, 59, 102)' }}
      >
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
        <p className='text-center mt-3'>Shared Services</p>
        <div className='d-flex justify-content-end'>
          <div
            className='btn-group'
            role='group'
            aria-label='Side-by-side button group'
          >
            <button className='btn btn-primary btn-sm mt-4'>+</button>
            <button className='btn btn-secondary btn-sm mt-4'>-</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FamilyDisplay;
