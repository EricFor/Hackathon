import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserComponent from './UserComponent';

export default function HomePage(props) {
  const navigate = useNavigate();

  return (
    <div>
      <div className='float-end'>
        <UserComponent />
      </div>
      <button
        className='btn btn-primary'
        onClick={() => navigate('/lifestyle')}
        style={{
          height: 150,
          width: 200,
          borderRadius: 50,
          background: 'white',
          border: 'none',
          marginTop: 30,
          marginLeft: 30,
          color: 'black',
        }}
      >
        Lifestyles
      </button>
    </div>
  );
}
