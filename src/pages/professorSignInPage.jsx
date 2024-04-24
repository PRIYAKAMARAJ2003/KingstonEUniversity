import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid, Link } from '@mui/material'; // Import Material-UI components
import axios from 'axios';

const ProfessorSignInPage = () => {
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
      const response = await axios.post('https://localhost:7281/api/Auth/ProfessorSignIn', formData);
      const { token } = response.data;
      const { email } = formData; // Extract email from form data
      localStorage.setItem('professorEmail', email); // Set email in local storage
      localStorage.setItem('token', token);
      // Redirect to professor dashboard or any other page after successful sign-in
      // Replace '/professorDashboard' with the actual path to the professor dashboard
      window.location.href = '/professorPage';
    } catch (error) {
      console.error('Error signing in professor:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h4" align="center" gutterBottom>Professor Sign In</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>Sign In</Button>
          {error && <Typography variant="body1" align="center" style={{ marginTop: '10px', color: 'red' }}>{error}</Typography>}
        </form>
        <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
          Don't have an account? <Link href="/professorSignUpPage">Sign Up</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ProfessorSignInPage;
