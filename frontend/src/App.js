import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';
import LifeStyle from './components/LifeStyle';
import Category from './components/Category';
import PageProvider from './global/pageContext';
import LifestyleNavbar from './components/LifestyleNavbar';
import Goal from './components/Goal';
function App() {
  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(135deg, #cc8c54, #542b29)',
        // backgroundColor: 'purple'
      }}
    >
      <PageProvider>
        <Router>
          <Routes>
            <Route path='/lifestyle/:a/:b' element={<LifestyleNavbar />}></Route>
            <Route path='/lifestyle/:a' element={<LifestyleNavbar />}></Route>
            <Route path='/lifestyle/' element={<LifestyleNavbar />}></Route>
          </Routes>
          <Routes>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/lifestyle' element={<LifeStyle />}></Route>
            <Route path='/lifestyle/category/:id' element={<Category />}></Route>
            <Route path='/lifestyle/goals/:id' element={<Goal />}></Route>
            {/* <Route path='/shop' element={<Shop />}></Route> */}
            {/* <Route path='adventure' element={<Adventure />}></Route> */}

            <Route></Route>
          </Routes>
        </Router>
      </PageProvider>
    </div>
  );
}

export default App;
