import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../../axios';
import './loginStyle.css';

const LoginForm = ({setIsLoggedOut}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('auth/login', formData);
      if (response) { 
        console.log(response.data)
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('username', response.data.user.username);
        setIsLoggedOut(false);
        navigate('/users');
        setErrorMessage(null);
      }
    } catch (error) {  
      if (error.response && error.response.status === 403) {
        setErrorMessage('User is blocked');
        toast.error('User is blocked.', {
        });
      } else {
        console.error('Authentication failed:', error);
        setErrorMessage('Invalid username or password. Please try again');
      }
    }
  };

  return (
    <div className='loginForm'>
    <Form className='' onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    {errorMessage && <div className="error-message">{errorMessage}</div>}
    <ToastContainer 
      autoClose={2000}
      closeOnClick={false}
      draggable={false}
      closeButton={false}
    />
    </div>
  );
};

export default LoginForm;
