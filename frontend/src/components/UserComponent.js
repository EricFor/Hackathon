import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getLoginAndSignupCSS() {
  return {
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
  };
}

export default function UserComponent(props) {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/user/me').then((res) => {
      setUserData(res.data);
    });
  }, []);

  return (
    <>
      {userData.username ? (
        <h2>{userData.username}</h2>
      ) : (
        <>
          <button
            className='form-button btn btn-primary m-2'
            style={getLoginAndSignupCSS()}
            onClick={() => navigate('/login')}
          >
            Log in
          </button>
          <button className='btn btn-primary m-2' style={getLoginAndSignupCSS()} onClick={() => navigate('/signup')}>
            Sign up
          </button>
        </>
      )}
    </>
  );
}
