import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
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
          height: 120,
          width: 250,
          background: 'white',
          border: 'none',
          marginTop: 30,
          marginLeft: 30,
          color: 'black',
          fontSize: 35,
        }}
      >
        Lifestyles
      </button>

      <h1
        style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 50,
          marginLeft: 350,
          zIndex: 1,
        }}
      >
        Welcome to Quest! <br /> The Goal Keeping Site.
      </h1>

      <Card
        style={{
          marginLeft: 30,
          marginTop: 30,
          maxWidth: 300,
          minHeight: 350,
          // maxHeight: 380,
        }}
      >
        <Card.Body>
          <Card.Title style={{ fontSize: 23 }}>Shortcuts</Card.Title>
          <Card.Text>
            There was not enough time to add shortcuts, but this is supposed to a place where your most recent places
            are saved - links to them
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
