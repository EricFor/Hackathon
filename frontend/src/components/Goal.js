import React, { useState } from 'react';
import axios from 'axios';
import '../css/FlexboxGrid.css';
import '../css/HoverTransparency.css';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import usePageContext from '../global/hooks/usePageContext';

export default function Goal() {
  const { id } = useParams();
  const [description, setDescription] = useState();
  const [subGoals, setSubgoals] = useState([]);

  const navigate = useNavigate();

  const [page, setPage] = usePageContext();

  const onGoalUpdate = () => {
    axios
      .get(`http://localhost:8000/api/user/goal?goalId=${id}`)
      .then((res) => {
        const data = res.data;
        setPage(data.name);
        setDescription(data.description);
        setSubgoals(data.goals);
      })
      .catch(() => navigate('/lifestyle'));
  };

  useEffect(() => {
    onGoalUpdate();
  }, [navigate]);

  return (
    <div>
      <CreateGoal onGoalUpdate={onGoalUpdate} goalId={id} />
      <div style={{ overflow: 'auto', height: '100vh' }}>
        <div className='flexbox'>
          {subGoals.map((e, i) => (
            <Subgoal key={i} name={e.name} goalId={e.id} description={e.description} onDelete={onGoalUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Subgoal(props) {
  const navigate = useNavigate();

  const onDelete = () => {
    axios
      .post('http://localhost:8000/api/user/category/removeGoal', {
        goalId: props.goalId,
      })
      .then(() => {
        if (props.onDelete) props.onDelete();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card style={{ width: '15rem', margin: 30, minWidth: '100px', minHeight: '150px' }}>
      <Card.Body style={{ cursor: 'pointer' }} onClick={() => navigate(`/lifestyle/goals/${props.goalId}`)}>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant='danger' onClick={onDelete}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
}

function CreateGoal(props) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title === '') return setError('Please specify a subgoal name. ');
    // now the title gets posted to server side?
    // bro how do i get the data ??
    // complete the url
    await axios
      .post('http://localhost:8000/api/user/goals/createSubgoal', {
        name: title,
        description: desc,
        goalId: props.goalId,
      })
      .then(() => {
        handleClose(); // nice
        setTitle('');
        setDesc('');
        setError('');
        if (props.onGoalUpdate) props.onGoalUpdate();
      })
      .catch((err) => {
        setError('An error occurred. ');
      });
  };

  return (
    <>
      <Button
        style={{
          position: 'fixed',
          left: '50px',
          bottom: '40px',
          backgroundColor: 'green',
          border: 'none',
          zIndex: 1000,
          fontSize: 25,
          width: 130,
          height: 130,
          borderRadius: '50%',
        }}
        variant='primary'
        onClick={handleShow}
        className='transparencyHover'
      >
        Create Goal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create your Subgoal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control type='text' autoFocus placeholder='Subgoal Name' onChange={(e) => setTitle(e.target.value)} />
            <br />
            <Form.Control type='text' placeholder='Subgoal Description' onChange={(e) => setDesc(e.target.value)} />
          </Modal.Body>
          {error !== '' ? <Alert variant='danger'>{error}</Alert> : <></>}
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={onSubmit}>
              Create
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
