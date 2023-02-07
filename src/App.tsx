import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Join from './pages/Join';
import Todos from './pages/Todo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Join />} />
        <Route path='/todo' element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
