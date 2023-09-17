import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/login';
import { routes } from './constants/constant';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
