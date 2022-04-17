import React from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import '../css/CategoryGrid.css';
import { useNavigate } from 'react-router-dom';

class LifeStyle extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    categories: [
      {
        id: 1,
        name: 'abcdefg',
      },
    ],
  };

  componentDidMount() {
    // axios
    //   .get('http://localhost:8000/api/user/categories')
    //   .then((res) => {
    //     const data = res.data;
    //     this.setState({
    //       categories: data,
    //     });
    //   })
    //   .catch((err) => {}); //
    /*
    categories format: 
    {
      id: number
      name: string
    }
    
    */
  }

  render() {
    return (
      <div className='flexbox '>
        {this.state.categories.map((elem) => (
          <Category name={elem.name} categoryId={elem.id} />
        ))}
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
      onClick={() => navigate(`/lifestyle/category/${props.categoryId}`)} // nvm not homepage
    >
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>Component id: {props.categoryId}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default LifeStyle;
