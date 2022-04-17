import React, { useState } from 'react';
import axios from 'axios';
import hash from 'hash.js';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    if (username === '' || password === '') {
      setWarning('Make sure all fields are completed!');
      return;
    }

    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/account/signup', {
        username: username,
        password: hash.sha256().update(password).digest('hex'),
      });

      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        display: 'flex',
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          backgroundColor: 'gray',
          padding: 30,
        }}
      >
        <h1 style={{ color: 'white' }}>Sign Up</h1>
        <Form.Control
          style={{
            maxWidth: '25vw',
          }}
          type='text'
          autoFocus
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <Form.Control
          style={{
            maxWidth: '25vw',
          }}
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {warning !== '' ? <Alert variant='danger'>{warning}</Alert> : <></>}
        <Button variant='primary' onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Signup;
