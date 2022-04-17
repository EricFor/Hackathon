import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import '../css/FlexboxGrid.css';
import '../css/HoverTransparency.css';
import { Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import usePageContext from '../global/hooks/usePageContext';

export default function Category() {
  // that gets the id from the url param
  const { id } = useParams();
  const [description, setDescription] = useState();
  const [goals, setGoals] = useState([]);

  const navigate = useNavigate();

  const [page, setPage] = usePageContext();

  const onGoalUpdate = () => {
    axios
      .get(`http://localhost:8000/api/user/category?id=${id}`)
      .then((res) => {
        const data = res.data;
        setPage(data.name);
        setDescription(data.description);
        setGoals(data.goals);
      })
      .catch(() => navigate('/lifestyle'));
  };

  useEffect(() => {
    onGoalUpdate();
  }, [navigate]);

  return (
    <div>
      <CreateGoal onGoalUpdate={onGoalUpdate} categoryId={id} />
      <div style={{ overflow: 'auto', height: '100vh' }}>
        <div className='flexbox'>
          {goals.map((e, i) => (
            <Goal key={i} name={e.name} goalId={e.id} description={e.description} onDelete={onGoalUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Goal(props) {
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
    if (title === '') return setError('Please specify a goal name. ');
    // now the title gets posted to server side?
    // bro how do i get the data ??
    // complete the url
    await axios
      .post('http://localhost:8000/api/user/category/createGoal', {
        name: title,
        description: desc,
        categoryId: props.categoryId,
      })
      .then(() => {
        handleClose(); // nice
        setError('');
        setTitle('');
        setDesc('');
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
            <Modal.Title>Create your Goal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control type='text' autoFocus placeholder='Goal Name' onChange={(e) => setTitle(e.target.value)} />
            <br />
            <Form.Control type='text' placeholder='Goal Description' onChange={(e) => setDesc(e.target.value)} />
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
