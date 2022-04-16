import React from 'react';
import axios from 'axios';
import hash from 'hash.js'; 

class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        username: "",
        password: "",
    }

    submit() {
        axios.post("http://localhost:8000/api/account/login", {
            username: this.state.username,
            password: hash.sha256().update(this.state.password).digest('hex'),
        });  // where should the data go
    }
    
    render() { 
        return (
            <form onSubmit={this.submit}>
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
                type="password" />
                <input type="submit" />
            </form>
        );
    }
}
 
export default Login;