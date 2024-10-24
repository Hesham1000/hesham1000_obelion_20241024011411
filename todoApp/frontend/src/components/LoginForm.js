import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.js.css';

const LoginForm = ({ onRegister, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isRegistering
        ? await axios.post('http://localhost:8000/api/auth/register', { email, password }, { headers: { 'Content-Type': 'application/json' } })
        : await axios.post('http://localhost:8000/api/auth/login', { email, password }, { headers: { 'Content-Type': 'application/json' } });

      if (response.status === 201 || response.status === 200) {
        isRegistering ? onRegister() : onLogin();
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <button
          type="button"
          className="toggle-button"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
