import React from 'react';
import axios from 'axios';
import { Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';
import '../css/FlexboxGrid.css';
import { useNavigate } from 'react-router-dom';

class LifeStyle extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    categories: [],
  };

  componentDidMount() {
    this.onCategoryUpdate(); 
    /*
    categories format: 
    {
      id: number
      name: string
    }
    
    */
  }

  onCategoryUpdate() {
    axios
      .get('http://localhost:8000/api/user/categories')
      .then((res) => {
        const data = res.data;
        this.setState({
          categories: data,
        });
      })
      .catch((err) => {}); 
  }
  
  render() {
    return (
      <div>
        <CreateCategory onCategoryUpdate={this.onCategoryUpdate.bind(this)} />
        <div style={{overflow: 'auto', height: '100vh'}}>
          <div className='flexbox'>
            {this.state.categories.map((elem) => (
              <Category name={elem.name} categoryId={elem.id} key={elem.id}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function Category(props) {
  // props.name
  // props.categoryId --> /lifestyle/category/${props.categoryId}

  const navigate = useNavigate();

  return (
    <Card
      style={{ width: '15rem', margin: 30, minWidth: '100px', minHeight: '150px', cursor: 'pointer' }}
      onClick={() => navigate(`/lifestyle/category/${props.categoryId}`)}
    >
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

function CreateCategory(props) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    // now the title gets posted to server side?
    // bro how do i get the data ??
    // complete the url
    console.log(title)
    await axios.post("http://localhost:8000/api/user/category/create", {
      name: title
    })
    .then(() => {
      handleClose(); // nice
      setError(""); 
      if (props.onCategoryUpdate) props.onCategoryUpdate(); 
    })
    .catch(err => {
      console.log(JSON.stringify(err.request)); 
      setError("An error occurred. "); 
    })
  }

  return (
    <>
    <Button style={{position: 'fixed', left: '10px', bottom: '10px', backgroundColor: 'green', border: 'none', zIndex: 1000}} variant="primary" onClick={handleShow}>Create</Button>

    <Modal show={show} onHide={handleClose}>
    <form onSubmit={onSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Create your Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control type="text" autoFocus placeholder="Category Name" onChange={e => setTitle(e.target.value)}/>
      </Modal.Body>
      {error !== "" ? <Alert variant="danger">{error}</Alert> : <></>}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={onSubmit}>Create</Button>
      </Modal.Footer>
      </form>
    </Modal>
    </>
  );
}

export default LifeStyle;
