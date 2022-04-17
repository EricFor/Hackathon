import React, { useState } from 'react';
import axios from 'axios';
import hash from 'hash.js';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/account/login', {
      username: username,
      password: hash.sha256().update(password).digest('hex'),
    });
    navigate('/lifestyle');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder='Username'
          type='text'
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder='Password'
          type='password'
        />
        <input type='submit' />
      </form>
    </div>
  );
}

export default Login;
