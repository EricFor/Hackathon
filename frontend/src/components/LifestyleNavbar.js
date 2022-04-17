import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserComponent from './UserComponent';
import { ArrowLeftCircleFill } from 'react-bootstrap-icons';
import usePageContext from '../global/hooks/usePageContext';
import { Button } from 'react-bootstrap';

export default function LifestyleNavbar(props) {
  const navigate = useNavigate();

  const [page] = usePageContext();

  return (
    <div style={{ width: '100%', height: '50px', backgroundColor: 'white', textAlign: 'center' }}>
      <div className='float-start' style={{ height: '100%' }}>
        <Button onClick={() => navigate(-1)} style={{ border: 'none', marginTop: '2px', marginLeft: '2px' }}>
          <ArrowLeftCircleFill className='m-2' />
        </Button>
      </div>
      <div
        className='float-end'
        style={{ marginRight: '10px', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
      >
        <UserComponent />
      </div>
      <h2 className='float-none'>{page}</h2>
    </div>
  );
}
