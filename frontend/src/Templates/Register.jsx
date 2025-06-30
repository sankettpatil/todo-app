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

export default function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8000/api/register/', { username, password });
      setMessage(' Registration successful! You can now log in.');
      setError(false);
      if (onRegister) onRegister();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registration failed');
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f4f6f8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4
      }}
    >
      <Card sx={{ width: 400, p: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            textAlign="center"
            color="primary"
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
              fontWeight: 'bold'
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
    </Box>
  );
}
