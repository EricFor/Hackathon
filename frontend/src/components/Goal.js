import React from 'react';
import axios from 'axios';
import '../css/FlexboxGrid.css';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';

export default function Goal() {
    const { id } = useState();
    const { subgoals } = useState([]);
    const { title } = useState([]);

    useEffect()

    return (
        <>
            <div className='flexbox'>
                {subgoals.map((e) => (
                    <Goal></Goal>
                ))}
            </div>
        </>
    );
}