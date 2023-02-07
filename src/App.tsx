import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Join from './pages/Join';
import Todos from './pages/Todo';

function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('rendering');
    const loginToken = localStorage.getItem('login-token');
    console.log(loginToken);
    if (loginToken) {
      navigate('/todo');
    } else {
      navigate('/signin');
    }
  }, []);
  return <></>;
}
function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Redirect />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Join />} />
          <Route path='/todo' element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
