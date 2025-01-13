import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from "./components/login/LoginForm";
import RegisterForm from "./components/register/RegisterForm";
import Home from "./components/home/Home";
import History from './components/history/History';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  </Router>
);

export default App;
