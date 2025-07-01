import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  List, ListItem, ListItemText, Checkbox, IconButton, Divider, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // token
  const token = localStorage.getItem('access');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/todos/', config);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  // Add todo
  const addTodo = async () => {
    if (inputValue.trim() === '') return;
    try {
      await axios.post(
        'http://localhost:8000/api/todos/add/',
        { title: inputValue, completed: false },
        config
      );
      setInputValue('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Toggle completed
  const toggleCompleted = async (id) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;
    try {
      await axios.put(
        `http://localhost:8000/api/todos/${id}/`,
        { completed: !todoToUpdate.completed },
        config
      );
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todos/${id}/delete/`, config);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #e0e7ff 0%, #f4f6f8 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 600,
          p: 3,
          boxShadow: 8,
          borderRadius: 5,
          background: 'rgba(255,255,255,0.95)',
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            gutterBottom
            textAlign="center"
            color="primary"
            sx={{ fontWeight: 700, letterSpacing: 1 }}
          >
            To-Do List
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Add a new task"
              variant="outlined"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              size="medium"
              sx={{
                bgcolor: '#f5f7fa',
                borderRadius: 2,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addTodo}
              sx={{
                px: 4,
                borderRadius: 2,
                fontWeight: 'bold',
                boxShadow: 2,
              }}
            >
              Add
            </Button>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <List>
            {todos.map((todo, index) => (
              <React.Fragment key={todo.id}>
                <ListItem
                  disableGutters
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => deleteTodo(todo.id)}
                      sx={{
                        color: '#888',
                        transition: 'color 0.2s',
                        '&:hover': { color: '#ff5945', bgcolor: 'transparent' },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{
                    px: 0,
                    '&:hover': { bgcolor: '#f5f7fa' },
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      minHeight: 48,
                      bgcolor: '#f5f7fa',
                      borderRadius: 2,
                      px: 2, 
                    }}
                  >
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleCompleted(todo.id)}
                      icon={<RadioButtonUncheckedIcon sx={{ fontSize: 28 }} />}
                      checkedIcon={<RadioButtonCheckedIcon sx={{ fontSize: 28 }} />}
                      sx={{
                        p: 0,
                        mr: 1.5,
                        color: '#1976d2',
                        '&.Mui-checked': { color: '#1976d2' },
                        alignSelf: 'center',
                        mt: 0.5, // <--- Add this line for vertical alignment
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? 'gray' : 'text.primary',
                        fontSize: 24, // adjust as needed
                        fontWeight: 500,
                        letterSpacing: 0.5,
                        m: 0,
                        p: 0,
                        display: 'flex',
                        alignItems: 'center',
                        lineHeight: 'normal', // important for vertical centering
                      }}
                    >
                      {todo.title}
                    </Typography>
                  </Box>
                </ListItem>
                {index < todos.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          {todos.length === 0 && (
            <Typography color="text.secondary" align="center" mt={2}>
              No tasks yet. Add one!
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}