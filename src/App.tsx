import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Join from './pages/Join';
import Todos from './pages/Todo';

function Redirect() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const loginToken = localStorage.getItem('login-token');
    if (loginToken) {
      navigate('/todo');
    } else {
      navigate('/signin');
    }
  }, [navigate]);
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
