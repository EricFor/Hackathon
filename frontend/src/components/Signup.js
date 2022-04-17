import React, { useState } from 'react';
import axios from 'axios';
import hash from 'hash.js';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/account/signup', {
        username: username,
        password: hash.sha256().update(password).digest('hex'),
      });

      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder='Username'
          type='text'
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder='Password'
          type='password'
        />
        <input type='submit' />
      </form>
    </div>
  );
}

// class Signup extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   state = {
//     username: '',
//     password: '',
//   };
//   submit() {
//     axios
//       .post('http://localhost:8000/api/account/signup', {
//         username: this.state.username,
//         password: this.state.password,
//       })
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   render() {
//     return (
//       <div>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             console.log('submitting...');
//             axios
//               .post('http://localhost:8000/api/account/signup', {
//                 username: this.state.username,
//                 password: hash.sha256().update(this.state.password).digest('hex'),
//               })
//               .then((data) => {
//                 console.log(data);
//               })
//               .catch((err) => {
//                 console.log(err);
//               });
//           }}
//         >
//           <input
//             onChange={(e) => {
//               this.setState({
//                 username: e.target.value,
//               });
//             }}
//             placeholder='Username'
//             type='text'
//           />
//           <input
//             onChange={(e) => {
//               this.setState({
//                 password: e.target.value,
//               });
//             }}
//             placeholder='Password'
//             type='password'
//           />
//           <input type='submit' />
//         </form>
//       </div>
//     );
//   }
// }

export default Signup;
