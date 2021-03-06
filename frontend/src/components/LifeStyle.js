import React, { useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';
import '../css/FlexboxGrid.css';
import { useNavigate } from 'react-router-dom';
import usePageContext from '../global/hooks/usePageContext';

function LifeStyle() {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const [page, setPage] = usePageContext();

  const onCategoryUpdate = () => {
    axios
      .get('http://localhost:8000/api/user/categories')
      .then((res) => {
        const data = res.data;
        console.log(data);
        setCategories(data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setPage('Lifestyle');
    onCategoryUpdate();
  }, [navigate]);

  return (
    <div>
      <CreateCategory onCategoryUpdate={onCategoryUpdate} />
      <div style={{ overflow: 'auto', height: '100vh' }}>
        <div className='flexbox'>
          {categories.map((elem, i) => (
            <Category key={i} name={elem.name} categoryId={elem.id} onDelete={onCategoryUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Category(props) {
  // props.name
  // props.categoryId --> /lifestyle/category/${props.categoryId}

  const navigate = useNavigate();

  const onDelete = () => {
    axios
      .post('http://localhost:8000/api/user/category/delete', {
        id: props.categoryId,
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
      <Card.Body style={{ cursor: 'pointer' }} onClick={() => navigate(`/lifestyle/category/${props.categoryId}`)}>
        <Card.Title>{props.name}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Button variant='danger' onClick={onDelete}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
}

function CreateCategory(props) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title === '') return setError('Please specify a category name. ');
    // now the title gets posted to server side?
    // bro how do i get the data ??
    // complete the url
    await axios
      .post('http://localhost:8000/api/user/category/create', {
        name: title,
      })
      .then(() => {
        handleClose(); // nice
        setError('');
        setTitle('');
        if (props.onCategoryUpdate) props.onCategoryUpdate();
      })
      .catch((err) => {
        console.log(err);
        setError('An error occurred. ');
      });
  };

  return (
    <>
      <Button
        style={{
          position: 'fixed',
          left: '10px',
          bottom: '10px',
          backgroundColor: 'green',
          border: 'none',
          zIndex: 1000,
        }}
        variant='primary'
        onClick={handleShow}
      >
        Create Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create your Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type='text'
              autoFocus
              placeholder='Category Name'
              onChange={(e) => setTitle(e.target.value)}
            />
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

export default LifeStyle;
