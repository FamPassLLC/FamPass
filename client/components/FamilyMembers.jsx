import React, { useState, useEffect } from 'react';

import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
function FamilyMembers(props) {
  //state to keep track of the new member to be added
  const [newMember, setNewMember] = useState('');
  //state to keep track of the current family password
  const [family_password, setFamilyPassword] = useState('');
  //state to keep track of members in a family
  const [family_members, setFamilyMembers] = useState([]);
  const handleFamilyNameInput = ({ target: { value } }) => {
    //listen for new input and assign that to new name
    setNewMember(value);
  };
  const handleFamilyPasswordInput = ({ target: { value } }) => {
    //listen for new input and assign that to new password
    setFamilyPassword(value);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const family_name = props.family_name;
    axios
      .post('/api/families/add-family-member', {
        family_name,
        local_user: newMember,
        family_password,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
  const handleRemoveMember = (e) => {
    e.preventDefault();
    const family_name = props.family_name;
    axios
      .delete(`/api/families/remove-family-member/${family_name}/${newMember}`)
      .then((result) => {})
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get('/api/families/allfamilies')
      .then((result) => {
        const members = result.data.filter(
          (fam) => fam.family_name === props.family_name
        );
        setFamilyMembers(members);
      })
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
      {/* display all users in the fam here */}
      <div>
        <p className='text-center mt-3'>Members</p>
        <p>
          {family_members.map((el, i) => (
            <span key={i}>{el.username} * </span>
          ))}
        </p>
      </div>
      {/*****************************************/}
      <div className='d-flex justify-content-end'>
        <div
          className='btn-group'
          role='group'
          aria-label='Side-by-side button group'
        >
          <Button
            variant='btn btn-primary btn-sm mt-4'
            onClick={props.handleShow1}
          >
            +
          </Button>
          <Modal show={props.show1} onHide={props.handleClose1}>
            <Modal.Header>
              <Modal.Title>Add new family member</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form
                noValidate
                validated={props.validated}
                onSubmit={handleAddMember}
              >
                <Form.Group>
                  <Form.Label>New member</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter your new family member..'
                    value={newMember}
                    onChange={handleFamilyNameInput}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Family password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    placeholder='Enter your family password...'
                    value={family_password}
                    onChange={handleFamilyPasswordInput}
                  ></Form.Control>
                </Form.Group>
                <Button
                  variant='primary'
                  type='submit'
                  onClick={props.handleClose1}
                >
                  Update
                </Button>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant='secondary' onClick={props.handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/********* handle remove a member **********/}
          <Button
            variant='btn btn-secondary btn-sm mt-4'
            onClick={props.handleShow2}
          >
            -
          </Button>
          <Modal show={props.show2} onHide={props.handleClose2}>
            <Modal.Header>
              <Modal.Title>Remove a family member</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form
                noValidate
                validated={props.validated}
                onSubmit={handleRemoveMember}
              >
                <Form.Group>
                  <Form.Label>Remove a member</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter family member you want to remove..'
                    value={newMember}
                    onChange={handleFamilyNameInput}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Family password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    placeholder='Enter your family password...'
                    value={family_password}
                    onChange={handleFamilyPasswordInput}
                  ></Form.Control>
                </Form.Group>
                <Button
                  variant='primary'
                  type='submit'
                  onClick={props.handleClose2}
                >
                  Update
                </Button>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant='secondary' onClick={props.handleClose2}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default FamilyMembers;
