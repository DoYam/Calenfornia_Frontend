import React, { Component, useState } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './screens/Login/login_screen.jsx';
import Main from './screens/Main/main_screen.jsx'; 
import './App.module.css';

function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />}/>
        <Route path="/Main" element={<Main />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;