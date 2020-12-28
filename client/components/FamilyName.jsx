import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function FamilyName(props) {
  //state to keep track of the modal being open or closed
  const [show, setShow] = useState(false);
  //state to keep track of the form for changing family name being filled out or empty
  const [validated, setValidated] = useState(false);
  //state to keep track of the new assigned name for family (form input)
  const [newName, setNewname] = useState();
  //state to keep track of the current family name (retrieved from database for display)
  const [family_name, setFamilyName] = useState(props.family_name);

  //switch states of modal being closed or open
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //submit new name to database
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    //if the form is not filled out, not allow to submit
    if (form.checkValidity() === false) {
      //confirm form input is filled out
      setValidated(true);
    }
    //PUT request to update family name
    axios
      .put('/api/families/renamefamily', { family_name, newName })
      .then((result) => {
        setFamilyName(result.data);
      })
      .catch((err) => console.log(err));
  };
  const handleInput = ({ target: { value } }) => {
    //listen for new input and assign that to new name
    setNewname(value);
  };
  return (
    <div className='d-flex align-items-center'>
      <p className='mr-3 mt-3'>
        <strong>{family_name}</strong>
      </p>

      <Button onClick={handleShow} variant='btn btn-outline-primary'>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Family Name</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New Family Name</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Enter your new family name...'
                value={newName}
                onChange={handleInput}
              ></Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit' onClick={handleClose}>
              Update
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default FamilyName;
