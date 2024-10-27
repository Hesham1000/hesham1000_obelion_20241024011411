import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.js.css';

function LoginForm() {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        const response = await axios.post('http://localhost:8000/api/register', {
          email,
          password,
          confirmPassword
        });
        setSuccess('Registration successful');
        setError('');
      } else {
        const response = await axios.post('http://localhost:8000/api/login', {
          email,
          password
        });
        setSuccess('Login successful');
        setError('');
        // Redirect to dashboard or another appropriate action
      }
    } catch (err) {
      setError(err.response.data.message || 'An error occurred');
      setSuccess('');
    }
  };

  const handleForgotPassword = async () => {
    try {
      await axios.post('http://localhost:8000/api/sendPasswordResetEmail', { email });
      setSuccess('Password reset email sent');
      setError('');
    } catch (err) {
      setError(err.response.data.message || 'An error occurred');
      setSuccess('');
    }
  };

  const handleResendConfirmation = async () => {
    try {
      await axios.post('http://localhost:8000/api/sendConfirmationEmail', { email });
      setSuccess('Confirmation email sent');
      setError('');
    } catch (err) {
      setError(err.response.data.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div className="login-form">
      <h1>User Registration and Login</h1>
      <div className="tabs">
        <button onClick={() => setIsRegister(true)} className={isRegister ? 'active' : ''}>Register</button>
        <button onClick={() => setIsRegister(false)} className={!isRegister ? 'active' : ''}>Login</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {isRegister && (
          <div className="form-field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
        )}
        <button type="submit" className="primary-button">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      {!isRegister && (
        <div className="additional-links">
          <a href="#forgot-password" onClick={handleForgotPassword}>Forgot Password?</a>
          <a href="#resend-confirmation" onClick={handleResendConfirmation}>Resend Confirmation Email</a>
        </div>
      )}
      <footer>
        <p>&copy; 2023 YourCompany</p>
        <a href="#terms">Terms of Service</a>
        <a href="#privacy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default LoginForm;
