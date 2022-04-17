import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

export default function Category() {
  // that gets the id from the url param
  const { id } = useParams();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [goals, setGoals] = useState();

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
                    goals: Goal[] (subgoals, omitted)
                }]
            }
            
            */
      setName(res.name);
      setDescription(res.description);
      setGoals(res.goals);
    });
  }, []);
}
