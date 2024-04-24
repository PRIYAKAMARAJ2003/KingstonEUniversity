import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid, Link } from '@mui/material'; // Import Material-UI components
import axios from 'axios';

const ProfessorSignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    educational_Qualification: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7281/api/Professors', formData);
      console.log(response.data); // Log the response data (optional)
      // Redirect to sign-in page after successful sign-up
      // Replace '/professorSigninPage' with the actual path to the professor sign-in page
      window.location.href = '/professorSignInPage';
    } catch (error) {
      console.error('Error signing up professor:', error);
      // Handle error and display appropriate message to the user
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h4" align="center" gutterBottom>Professor Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
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
            <Grid item xs={12}>
              <TextField
                name="educational_Qualification"
                label="Educational_Qualification"
                variant="outlined"
                fullWidth
                value={formData.educational_Qualification}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>Sign Up</Button>
        </form>
        <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
          Already have an account? <Link href="/professorSignInPage">Sign In</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ProfessorSignUpPage;
