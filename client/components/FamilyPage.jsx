import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import FamilyDisplay from './FamilyDisplay';
import SideBar from './SideBar';
import axios from 'axios';

function FamilyPage(props) {
  //switch states of modal being closed or open
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  //state to keep track of the modal being open or closed
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  //state to keep track of the form for changing family name being filled out or empty
  const [validated, setValidated] = useState(false);
  //state to keep track of total families
  const [families, setFamilies] = useState([]);
  //state to keep track of the current family name (retrieved from database for display)
  const [family_name, setFamilyName] = useState('');
  //state to keep track of the current family password
  const [family_password, setFamilyPassword] = useState('');

  useEffect(() => {
    //retrieve current family name from db to display
    axios
      .get('api/families/allfamilies')
      .then((result) => {
        const userFams = result.data.filter(
          (el) => el.username === props.local_user.username
        );
        setFamilies(userFams);
      })
      .catch((err) => console.log(err));
  }, []);
  //submit new name to database
  const handleAddFamily = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    //if the form is not filled out, not allow to submit
    if (form.checkValidity() === false) {
      //confirm form input is filled out
      setValidated(true);
    }

    //POST request to add an user to the family just created and create a family in the database
    const local_user = props.local_user;

    axios
      .post('/api/families/addfamily', { family_name, family_password })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    setTimeout(() => {
      const local_user = props.local_user.username;
      axios
        .post('/api/families/add-family-member', {
          family_name,
          family_password,
          local_user,
        })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }, 2000);
  };

  const handleJoinFamily = (e) => {
    e.preventDefault();
    axios
      .post('/api/families/add-family-member', {
        family_name,
        family_password,
        local_user,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
  const handleFamilyNameInput = ({ target: { value } }) => {
    //listen for new input and assign that to new name
    setFamilyName(value);
  };
  const handleFamilyPasswordInput = ({ target: { value } }) => {
    //listen for new input and assign that to new password
    setFamilyPassword(value);
  };
  return (
    <div className='d-flex'>
      <div className='col-3 px-0'>
        <SideBar
          local_user={props.local_user.username}
          switchTo='View shared services'
        />
      </div>
      <div className='col-8 mt-5 pt-5 ml-5'>
        {families.map((data, i) => {
          return (
            <FamilyDisplay
              setFamilies={setFamilies}
              families={families}
              family_name={data.family_name}
              key={i}
              local_user={props.local_user.username}
            />
          );
        })}

        <div className='d-flex justify-content-end'>
          {/************* handle join family ****************/}
          <Button variant='btn btn-outline-primary mr-2' onClick={handleShow1}>
            Join family
          </Button>
          <Modal show={show1} onHide={handleClose1}>
            <Modal.Header>
              <Modal.Title>Join A Family</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleJoinFamily}
              >
                <Form.Group>
                  <Form.Label>Family Name</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter a family name to join...'
                    value={family_name}
                    onChange={handleFamilyNameInput}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Family Password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    placeholder='Enter a family password to join...'
                    value={family_password}
                    onChange={handleFamilyPasswordInput}
                  ></Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit' onClick={handleClose1}>
                  Join family
                </Button>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/************* handle add family ****************/}

          <Button variant='btn btn-primary' onClick={handleShow2}>
            + Add Family
          </Button>

          <Modal show={show2} onHide={handleClose2}>
            <Modal.Header>
              <Modal.Title>Create Your Family</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form noValidate validated={validated} onSubmit={handleAddFamily}>
                <Form.Group>
                  <Form.Label>Family Name</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter your family name...'
                    value={family_name}
                    onChange={handleFamilyNameInput}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Family Password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    placeholder='Enter your family password...'
                    value={family_password}
                    onChange={handleFamilyPasswordInput}
                  ></Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit' onClick={handleClose2}>
                  Create family
                </Button>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose2}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default FamilyPage;
