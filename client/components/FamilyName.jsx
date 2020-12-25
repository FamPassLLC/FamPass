import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function FamilyName() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  //value is input value for a new family name
  const [newName, setNewname] = useState();
  const [family_name, setFamilyName] = useState('');

  useEffect(() => {
    axios
      .get('api/families/')
      .then((result) => {
        setFamilyName(result.data[0].family_name);
      })
      .catch((err) => console.log(err));
  }, []);
  //switch states
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //submit new name to database
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      setValidated(true);
    }
    setNewname();
    axios
      .put('/api/families/renamefamily', { family_name, newName })
      .then((result) => setFamilyName(JSON.parse(result.config.data).newName))
      .catch((err) => console.log(err));
  };
  const handleInput = ({ target: { value } }) => {
    setNewname(value);
  };
  return (
    <div className='d-flex'>
      <p className='mr-3'>
        <strong>{family_name}</strong>
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
                value={newName}
                onChange={handleInput}
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
