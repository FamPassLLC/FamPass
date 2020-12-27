import React, { useState, useEffect } from 'react';

import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
function FamilyMembers(props) {
  const [newMember, setNewMember] = useState('');
  const handleInput = ({ target: { value } }) => {
    //listen for new input and assign that to new name
    setNewMember(value);
  };
  useEffect(() => {
    const family_name = props.family_name;
    axios
      .post('/api/families/add-family-member/', {
        family_name,
        local_user: newMember,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      id='members'
      className=' py-4 col-4'
      style={{ color: 'rgb(13, 59, 102)' }}
    >
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
      <p className='text-center mt-3'>Members</p>
      <div className='d-flex justify-content-end'>
        <div
          className='btn-group'
          role='group'
          aria-label='Side-by-side button group'
        >
          <Button
            variant='btn btn-primary btn-sm mt-4'
            onClick={props.handleShow}
          >
            +
          </Button>
          <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header>
              <Modal.Title>Add new family member</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form
                noValidate
                validated={props.validated}
                onSubmit={props.handleSubmit}
              >
                <Form.Group>
                  <Form.Label>New Member</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter your new family member..'
                    value={newMember}
                    onChange={handleInput}
                  ></Form.Control>
                </Form.Group>
                <Button
                  variant='primary'
                  type='submit'
                  onClick={props.handleClose}
                >
                  Update
                </Button>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant='secondary' onClick={props.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <button className='btn btn-secondary btn-sm mt-4'>-</button>
        </div>
      </div>
    </div>
  );
}
export default FamilyMembers;
