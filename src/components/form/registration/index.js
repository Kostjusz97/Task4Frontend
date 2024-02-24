import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from '../../../axios';
import './registrationStyle.css'

const RegistrationForm = ({ setIsLoggedOut }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    const newFormErrors = { ...formErrors };

    if (!formData.username.trim()) {
      newFormErrors.username = 'Username is required';
      hasErrors = true;
    }

    if (!formData.email.trim()) {
      newFormErrors.email = 'Email is required';
      hasErrors = true;
    } else if (!validateEmail(formData.email)) {
      newFormErrors.email = 'Invalid email format';
      hasErrors = true;
    }

    if (!formData.password.trim()) {
      newFormErrors.password = 'Password is required';
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(newFormErrors);
      return;
    }

    try {
      const { data } = await axios.post('/auth/register', formData);
      if (data && data.user) {
        localStorage.setItem('userId', data.user.id);        
        localStorage.setItem('username', data.user.username);
        setIsLoggedOut(false);
        navigate('/users');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className='registerForm'>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <Form.Text className="text-danger">{formErrors.username}</Form.Text>
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Form.Text className="text-danger">{formErrors.email}</Form.Text>
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
        <Form.Text className="text-danger">{formErrors.password}</Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
    </div>
  );
};

export default RegistrationForm;
