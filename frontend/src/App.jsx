import React, { useState } from 'react';
import './App.css';
import Todos from './Templates/Todos.jsx';
import Login from './Templates/Login.jsx';
import Register from './Templates/Register.jsx';
import { Box, Button } from '@mui/material';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div>
        {showRegister ? (
          <Register onRegister={() => setShowRegister(false)} onShowLogin={() => setShowRegister(false)} />
        ) : (
          <Login
            onLogin={() => setIsLoggedIn(true)}
            onShowRegister={() => setShowRegister(true)}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{
            borderRadius: 5,
            textTransform: 'none',
            fontWeight: 'bold',
            width: 200,
            fontSize: 20,
            py: 1,
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <Todos />
    </>
  );
}

export default App;
