import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import FamilyDisplay from './FamilyDisplay';
import SideBar from './SideBar';
import axios from 'axios';
function FamilyPage() {
  //switch states of modal being closed or open
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //state to keep track of the modal being open or closed
  const [show, setShow] = useState(false);
  //state to keep track of the form for changing family name being filled out or empty
  const [validated, setValidated] = useState(false);
  //state to keep track of total families
  const [families, setFamilies] = useState([]);
  //state to keep track of the current family name (retrieved from database for display)
  const [family_name, setFamilyName] = useState('');

  useEffect(() => {
    //retrieve current family name from db to display
    axios
      .get('api/families/')
      .then((result) => {
        setFamilies(result.data);
      })
      .catch((err) => console.log(err));
  }, [families]);

  //submit new name to database
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    //if the form is not filled out, not allow to submit
    if (form.checkValidity() === false) {
      //confirm form input is filled out
      setValidated(true);
    }
    //POST requet to add a family
    axios
      .post('/api/families/addfamily/', { family_name })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  };
  const handleInput = ({ target: { value } }) => {
    //listen for new input and assign that to new name
    setFamilyName(value);
  };
  return (
    <div className='d-flex'>
      <div className='col-3 px-0'>
        <SideBar switchTo='View shared services' />
      </div>
      <div className='col-8 mt-5 pt-5 ml-5'>
        {families.map((data) => {
          return (
            <FamilyDisplay
              setFamilies={setFamilies}
              families={families}
              family_name={data.family_name}
              key={data._id}
            />
          );
        })}

        <div className='d-flex justify-content-end'>
          <Button variant='btn btn-outline-primary mr-2'>Join family</Button>
          <Button variant='btn btn-primary' onClick={handleShow}>
            + Add Family
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Create Your Family</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Family Name</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter your family name...'
                    value={family_name}
                    onChange={handleInput}
                  ></Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit' onClick={handleClose}>
                  Create family
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
      </div>
    </div>
  );
}

export default FamilyPage;
