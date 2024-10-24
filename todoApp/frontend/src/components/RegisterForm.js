import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.js.css';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setConfirmationMessage(response.data.message);
    } catch (error) {
      setConfirmationMessage(error.response.data.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
}

export default RegisterForm;
