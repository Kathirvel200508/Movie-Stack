import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login', 'signup', 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      if (mode === 'login') {
        const res = await fetch(`${apiUrl}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
          setMessage('Logged in!');
          if (onLogin) onLogin(data.user || email);
        } else {
          setMessage(data.error || 'Login failed');
        }
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          setMessage('Passwords do not match');
          return;
        }
        const res = await fetch(`${apiUrl}/api/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
          setMessage('Account created! You can now log in.');
          setMode('login');
        } else {
          setMessage(data.error || 'Signup failed');
        }
      } else if (mode === 'reset') {
        const res = await fetch(`${apiUrl}/api/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (res.ok) {
          setMessage('Password reset link sent.');
          setMode('login');
        } else {
          setMessage(data.error || 'Reset failed');
        }
      }
    } catch (err) {
      setMessage('Network error: Backend not reachable.');
    }
  };

  return (
    <div className="login-page">
      <h2>{mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {(mode === 'login' || mode === 'signup') && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        )}
        {mode === 'signup' && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        )}
        <button type="submit">
          {mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Send Reset Link'}
        </button>
      </form>
      <div className="login-links">
        {mode !== 'login' && (
          <button onClick={() => setMode('login')}>Back to Login</button>
        )}
        {mode === 'login' && (
          <>
            <button onClick={() => setMode('signup')}>Sign Up</button>
            <button onClick={() => setMode('reset')}>Forgot Password?</button>
          </>
        )}
      </div>
      {message && <div className="login-message">{message}</div>}
    </div>
  );
}

export default LoginPage;
