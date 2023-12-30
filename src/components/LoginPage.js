// LoginPage.js
import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, Container, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import stockImage from './stock2.jpg';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Replace this with your actual authentication logic
    if (username === 'admin' && password === 'admin') {
      setError('');
      onLogin();
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <CssBaseline />
      <div
        style={{
          background: `url(${stockImage}) center/cover no-repeat fixed`,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} style={{ padding: '20px', width: '300px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.8)', marginTop: '50px' }}>
          <Typography component="h1" variant="h4" style={{ color: '#000', marginBottom: '20px' }}>
            Stock Market Login
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            style={{ margin: '20px 0' }}
          >
            Login
          </Button>
          {error && <Typography variant="body2" color="error" style={{ color: '#000' }}>{error}</Typography>}
        </Paper>
      </div>
    </>
  );
};

export default LoginPage;
