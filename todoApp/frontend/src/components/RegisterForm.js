import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.js.css';

function RegisterForm() {
  const [activeTab, setActiveTab] = useState('register');
  const [registrationData, setRegistrationData] = useState({ email: '', password: '', confirmPassword: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register', registrationData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data.token) {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error registering user');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', loginData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data.token) {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error logging in');
    }
  };

  const sendConfirmationEmail = async () => {
    try {
      await axios.post('http://localhost:8000/api/sendConfirmationEmail', { email: registrationData.email }, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      setErrorMessage('Error sending confirmation email');
    }
  };

  const sendPasswordResetEmail = async () => {
    try {
      await axios.post('http://localhost:8000/api/sendPasswordResetEmail', { email: loginData.email }, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      setErrorMessage('Error sending password reset email');
    }
  };

  return (
    <div className="register-login-container">
      <h1>User Registration and Login</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab('register')} className={activeTab === 'register' ? 'active' : ''}>
          Register
        </button>
        <button onClick={() => setActiveTab('login')} className={activeTab === 'login' ? 'active' : ''}>
          Login
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {activeTab === 'register' && (
        <form onSubmit={handleRegisterSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registrationData.email}
            onChange={handleRegisterChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registrationData.password}
            onChange={handleRegisterChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={registrationData.confirmPassword}
            onChange={handleRegisterChange}
            required
          />
          <button type="submit" className="primary-action-button">Register</button>
          <button type="button" onClick={sendConfirmationEmail} className="secondary-action-button">Send Confirmation Email</button>
        </form>
      )}
      {activeTab === 'login' && (
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <button type="submit" className="primary-action-button">Login</button>
          <div className="additional-links">
            <a href="#" onClick={sendPasswordResetEmail}>Forgot Password?</a>
            <a href="#" onClick={sendConfirmationEmail}>Resend Confirmation Email</a>
          </div>
        </form>
      )}
      <footer>
        <p>&copy; 2023 TodoApp. All rights reserved.</p>
        <a href="/terms-of-service">Terms of Service</a>
        <a href="/privacy-policy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default RegisterForm;
