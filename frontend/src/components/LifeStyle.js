import React from 'react';
import axios from 'axios';

class LifeStyle extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() { 
        return(
        <div>
            <button type="button" className="btn btn-primary m-5">Create</button>
        </div>
        );
    }
}
 
export default LifeStyle;