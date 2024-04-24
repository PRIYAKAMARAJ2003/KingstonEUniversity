import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';

const RegistrarSignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7281/api/Registrar/signin', formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      // Redirect to desired page after successful sign-in
      window.location.href = '/registrarPage';
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>Registrar Sign In</Typography>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoFocus
                />
                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ marginTop: '10px' }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>Sign In</Button>
                {error && <Typography color="error" style={{ marginTop: '10px', textAlign: 'center' }}>{error}</Typography>}
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default RegistrarSignInPage;
