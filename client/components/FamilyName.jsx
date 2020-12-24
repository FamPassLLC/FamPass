import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function FamilyName() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  //switch states
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //submit new name to database
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    //axios.put()
  };
  return (
    <div className='d-flex'>
      <p className='mr-3'>
        <strong>Family Name</strong>
      </p>

      <Button variant='info' onClick={handleShow}>
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
              ></Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit'>
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
