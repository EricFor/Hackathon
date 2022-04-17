import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/HomePage';
import LifeStyle from './components/LifeStyle';
import Shop from './components/Shop';
import Adventure from './components/Adventure';
import UserProvider from './global/userContext';
import Category from './components/Category';
function App() {
  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(135deg, #cc8c54, #542b29)',
      }}
    >
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/' element={<Home />}></Route>
            <Route path='/lifestyle' element={<LifeStyle />}></Route>
            <Route path='/lifestyle/category/:id' element={<Category />}></Route>
            <Route path='/lifestyle/category/:id' element={<Category />}></Route>
            <Route path='/shop' element={<Shop />}></Route>
            <Route path='adventure' element={<Adventure />}></Route>
            <Route></Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
