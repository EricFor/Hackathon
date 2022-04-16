import React from 'react';
import axios from 'axios';
import hash from 'hash.js'; 

class Signup extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        username: "",
        password: "",
    }
    submit() {
        axios.post("http://localhost:8000/api/account/signup", {
            username: this.state.username,
            password: this.state.password,
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    }
    render() { 
        return (  
            <form onSubmit={(e) => {
                e.preventDefault(); 
                console.log("submitting...");
                axios.post("http://localhost:8000/api/account/signup", {
                    username: this.state.username,
                    password: hash.sha256().update(this.state.password).digest('hex'),
                })
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
            }} >
                <input onChange={(e) => {
                    this.setState({
                        username: e.target.value
                    }); 
                }}
                placeholder="Username"
                type="text"
                /> 
                <input onChange={(e) => {
                    this.setState({
                        password: e.target.value
                    }); 
                }}
                placeholder="Password"
                type="password"
                />
                <input type="submit" />
            </form>
        );
    }
}
 
export default Signup;