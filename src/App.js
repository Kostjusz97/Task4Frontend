import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainTable from './components/table';
import LoginForm from './components/form/login';
import RegistrationForm from './components/form/registration';
import Header from './components/header';

function App() {
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const handleToggleLogout = () => {
    setIsLoggedOut(!isLoggedOut);
  };

  return (
    <div className="App">
      <Header
        isLoggedOut={isLoggedOut}
        handleToggleLogout={handleToggleLogout}
      /> 
      <Routes>
          <Route path="/" element={<></>} />
          <Route path="/login" element={<LoginForm setIsLoggedOut={setIsLoggedOut} />}/>
          <Route path="/register" element={<RegistrationForm setIsLoggedOut={setIsLoggedOut} />}/>
          <Route path="/users" element={<MainTable handleToggleLogout={handleToggleLogout}/>}/>
      </Routes>
    </div>
  );
} 

export default App;
