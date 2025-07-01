import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert
} from '@mui/material';

export default function Register({ onRegister, onShowLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8000/api/register/', {
        username,
        password,
      });
      setMessage('Registration successful!');
      setError(false);
      if (onRegister) onRegister();
    } catch {
      setMessage('Registration failed. Try a different username.');
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #e0e7ff 0%, #f4f6f8 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        textAlign="center"
        color="primary"
        sx={{ fontWeight: 700, letterSpacing: 1 }}
      >
        To-Do Web App
      </Typography>
      <Card
        sx={{
          width: 400,
          p: 4,
          boxShadow: 8,
          borderRadius: 5,
          background: 'rgba(255,255,255,0.97)',
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            textAlign="center"
            color="primary"
            sx={{ fontWeight: 700, letterSpacing: 1 }}
          >
            Register
          </Typography>

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: 18,
              py: 1.5,
              boxShadow: 2,
            }}
            onClick={handleRegister}
          >
            Register
          </Button>

          {message && (
            <Alert severity={error ? 'error' : 'success'} sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="error"
        fullWidth
        sx={{
          mt: 3,
          width: 400,
          borderRadius: 5,
          textTransform: 'none',
          fontWeight: 'bold'
        }}
        onClick={onShowLogin}
      >
        Login
      </Button>
    </Box>
  );
}
