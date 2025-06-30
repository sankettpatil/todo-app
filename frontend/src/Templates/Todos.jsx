import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Divider,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const token = localStorage.getItem('access');
  const config = useMemo(() => ({
    headers: { Authorization: `Bearer ${token}` }
  }), [token]);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/todos/', config);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, [config]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

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

  const toggleCompleted = async (id) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;

    try {
      await axios.put(`http://localhost:8000/api/todos/${id}/`, {
        completed: !todoToUpdate.completed
      }, config);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

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
        bgcolor: '#f4f6f8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 600, p: 2, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom textAlign="center" color="primary">
            To-do App
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Add a new task"
              variant="outlined"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              size="small"
            />
            <Button variant="contained" color="primary" onClick={addTodo}>
              Add
            </Button>
          </Stack>

          <List>
            {todos.map((todo, index) => (
              <React.Fragment key={todo.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    onChange={() => toggleCompleted(todo.id)}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? 'gray' : 'text.primary'
                        }}
                      >
                        {todo.title}
                      </Typography>
                    }
                  />
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
