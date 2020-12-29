import React, { Component, useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import FamilyName from './FamilyName';
import FamilyMembers from './FamilyMembers';
import FamilyServices from './FamilyServices';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

function FamilyDisplay(props) {
  //switch states of modal being closed or open
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  //state to keep track of the modal being open or closed
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  //state to keep track of the form for changing family name being filled out or empty
  const [validated, setValidated] = useState(false);
  //state to keep track of total users per family
  const [familyusers, setFamilyUsers] = useState([]);
  //state to keep track of total services per family
  const [familyservices, setFamilyServices] = useState([]);

  //handle delete family
  const handleDelete = (props) => {
    const family_name = props.family_name;
    axios
      .delete(`/api/families/deletefamily/${family_name}`)
      .then((result) => {})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //GET request to identify number of family members in one family
    fetch('/api/families/allfamilies')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const userFams = data.filter(
          (el) => el.family_name === props.family_name
        );
        setFamilyUsers(userFams);
      });
  }, []);

  //GET request to identify number of services in one family
  useEffect(() => {
    fetch('/api/services/get-login-info')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const famServices = data.filter(
          (el) => el.family_name === props.family_name
        );
        setFamilyServices(famServices);
      });
  }, []);

  return (
    <div
      id='familyName'
      className='d-flex mb-5 justify-content-around'
      style={{ border: 'solid 1px rgb(13, 59, 102)', borderRadius: '15px' }}
    >
      <div className='py-2 col-4'>
        <FamilyName family_name={props.family_name} className='mt-3 mr-3' />
        <p className='mb-0 mt-2'>{familyusers.length} user(s)</p>
        <p>{familyservices.length} service(s)</p>
        <button
          className='btn btn-secondary btn-sm'
          onClick={() => handleDelete(props)}
        >
          - Remove family
        </button>
      </div>

      <FamilyMembers
        local_user={props.local_user}
        family_name={props.family_name}
        handleShow1={handleShow1}
        handleShow2={handleShow2}
        show1={show1}
        show2={show2}
        handleClose1={handleClose1}
        handleClose2={handleClose2}
        validated={validated}
      />
      <FamilyServices
        local_user={props.local_user}
        family_name={props.family_name}
        handleShow3={handleShow3}
        handleShow4={handleShow4}
        show3={show3}
        show4={show4}
        handleClose3={handleClose3}
        handleClose4={handleClose4}
        validated={validated}
      />
    </div>
  );
}
export default FamilyDisplay;
