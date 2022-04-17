import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import '../css/FlexboxGrid.css';
import { Card } from 'react-bootstrap';

export default function Category() {
  // that gets the id from the url param
  const { id } = useParams();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [goals, setGoals] = useState([]);

  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/category?category=${id}`).then((res) => {
      // uhh im workin gon it
      // returns:
      /*
            {
                id: number, 
                name: string, 
                goals: [{
                  id: number, 
                  name: string, 
                  description?: string,
                }]
            }

            Category 1 {
              id: 1, 
              name: "RandomCateogyr", 
              goals: [
                {
                  id: 12313, 
                  name: "goal1", 
                  description: "blahblakv"
                }
              ]
            }

            Goal 12313 {
              name: "goal1", 
              description: "blahblakv", 
              goals: [{
                id: 165423, 
                name: "aSubgoal", 
                descirption: "asdajwd"
              }]
            }
            
            */

      const data = res.data;
      setName(data.name);
      setDescription(data.description);
      setGoals(data.goals);
    })
    .catch(() => navigate('/lifestyle')); 
  }, []);

  return (
    <>
      <div className="flexbox">
        {
          goals.map(e => {
            <Goal name={e.name} goalId={e.id} />
          })
        }
      </div>
    </>
  );
}

function Goal(props) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/lifestyle/goals/${props.goalId}`)}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
      </Card.Body>
    </Card>
  )
}
