import React, { useState } from 'react';
import './App.css';
import Todos from './Templates/Todos.jsx';
import Login from './Templates/Login.jsx';
import Register from './Templates/Register.jsx';

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
          <>
            <Register onRegister={() => setShowRegister(false)} />
            <button onClick={() => setShowRegister(false)}>Back to Login</button>
          </>
        ) : (
          <>
            <Login onLogin={() => setIsLoggedIn(true)} />
            <button onClick={() => setShowRegister(true)}>Register</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <Todos />
    </div>
    
  );
}

export default App;
