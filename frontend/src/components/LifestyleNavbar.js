import React from "react"
import { useNavigate, useLocation } from 'react-router-dom'; // not found
import UserComponent from "./UserComponent";
import {ArrowLeftCircleFill} from 'react-bootstrap-icons'; 

export default function LifestyleNavbar(props) {

     
    const navigate = useNavigate(); 

    return <div style={{width: '100%', height: '50px', backgroundColor: "white"}} >
        <div className='float-start'>
            {/* <button className="btn btn-primary m-2" style={{border: 'none'}} onClick={() => navigate('/homepage')}>
                Back
            </button> */}
            <button>
                <ArrowLeftCircleFill className="m-2" style={{border: 'none'}} />
            </button>  
        </div>
        <div className='float-end' style={{right: '10px'}}>
            <UserComponent />
        </div>
    </div>
}