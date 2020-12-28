import React, { useState, useEffect } from 'react';

import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
function FamilyServices(props) {
  //state to keep track of the new service to be added
  const [service, setService] = useState('');
  //state to keep track of the current service password
  const [service_password, setServicePassword] = useState('');
  //state to keep track of the current service username
  const [service_username, setServiceUsername] = useState('');
  //state to keep track of services in a family
  const [family_services, setFamilyServices] = useState([]);
  const handleServiceNameInput = ({ target: { value } }) => {
    //listen for new input and assign that to new name
    setService(value);
  };
  const handleServiceUsernameInput = ({ target: { value } }) => {
    //listen for new input and assign that to new name
    setServiceUsername(value);
  };
  const handleServicePasswordInput = ({ target: { value } }) => {
    //listen for new input and assign that to new password
    setServicePassword(value);
  };
  //add a new service to the database then share it with your chosen family
  const handleAddService = (e) => {
    e.preventDefault();
    const family_name = props.family_name;
    const local_user = props.local_user;
    console.log(service, service_username);
    axios
      .post('/api/services/', {
        local_user,
        service,
        service_username,
        service_password,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    setTimeout(() => {
      console.log(service);
      axios
        .post('/api/families/share-service', {
          family_name,
          service,
          local_user,
        })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }, 2000);
  };
  const handleRemoveService = (e) => {
    e.preventDefault();
    const family_name = props.family_name;
    const local_user = props.local_user;
    axios
      .delete(
        `/api/families/stop-sharing-service/${family_name}/${service}/${local_user}`
      )
      .then((result) => {})
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get('/api/services/get-login-info')
      .then((result) => {
        const users = result.data.filter(
          (fam) => fam.family_name === props.family_name
        );
        const services = users.map((user) => user.service);
        setFamilyServices(services);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
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
      {/* display all services in the fam here */}
      <div>
        <p className='text-center mt-3'>Shared services</p>
        <p>
          {family_services.map((service, i) => (
            <span key={i}>{service} * </span>
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
            onClick={props.handleShow3}
          >
            +
          </Button>
          <Modal show={props.show3} onHide={props.handleClose3}>
            <Modal.Header>
              <Modal.Title>Add new service</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form
                noValidate
                validated={props.validated}
                onSubmit={handleAddService}
              >
                <Form.Group>
                  <Form.Label>New service</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter your new service..'
                    value={service}
                    onChange={handleServiceNameInput}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Service username</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter your service username..'
                    value={service_username}
                    onChange={handleServiceUsernameInput}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Service password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    placeholder='Enter your service password...'
                    value={service_password}
                    onChange={handleServicePasswordInput}
                  ></Form.Control>
                </Form.Group>
                <Button
                  variant='primary'
                  type='submit'
                  onClick={props.handleClose3}
                >
                  Update
                </Button>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant='secondary' onClick={props.handleClose3}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/********* handle remove a service **********/}
          <Button
            variant='btn btn-secondary btn-sm mt-4'
            onClick={props.handleShow4}
          >
            -
          </Button>
          <Modal show={props.show4} onHide={props.handleClose4}>
            <Modal.Header>
              <Modal.Title>Remove a service</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form
                noValidate
                validated={props.validated}
                onSubmit={handleRemoveService}
              >
                <Form.Group>
                  <Form.Label>Remove a service</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter service you want to remove..'
                    value={service}
                    onChange={handleServiceNameInput}
                  ></Form.Control>
                </Form.Group>

                <Button
                  variant='primary'
                  type='submit'
                  onClick={props.handleClose4}
                >
                  Update
                </Button>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant='secondary' onClick={props.handleClose4}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default FamilyServices;
