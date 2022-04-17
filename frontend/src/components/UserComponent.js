import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getLoginAndSignupCSS() {
  return {
    // backgroundColor: 'white',
    // color: 'black',
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
  }, [navigate]);

  return (
    <>
      {userData.username ? (
        // <div
        //   className='rounded-circle mr-2 border border-white d-inline-flex font-weight-bold align-middle align-items-center justify-content-center'
        //   style={{
        //     marginTop: 10,
        //     marginRight: 10,
        //     minWidth: '60px',
        //     minHeight: '60px',
        //     backgroundColor: 'white',
        //   }}
        // >
        <h3>{userData.username}</h3>
      ) : (
        // </div>

        // <div
        //   style={{
        //     marginTop: 30,
        //     marginRight: 50,
        //     height: 100,
        //     width: 100,
        //     backgroundColor: 'black',
        //     color: 'white',
        //     border: 'none',
        //     borderRadius: '50%',
        //   }}
        // >
        //   <p>{userData.username}</p>
        // </div>
        <>
          <button className='btn btn-primary m-2' style={getLoginAndSignupCSS()} onClick={() => navigate('/login')}>
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
