import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid } from '@mui/material'; // Import Material-UI components
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios'; // Import Axios

const StudentSignInPage =() => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('https://localhost:7281/api/Auth/signin', formData);
            const { studentID, token }= response.data;
            const { email } = formData; // Extract email from form data
            localStorage.setItem('studentEmail', email); 
            localStorage.setItem('token', token);
            window.location.href = '/studentPage';
        }catch(error){
            setError('Invalid email and password');
        }
    };  
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginLeft: '240px' }}>
            <Container maxWidth="md">
                <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#ffffff' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', textAlign: 'center' }}>Student Sign In</Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField name="email" label="Email" variant="outlined" fullWidth value={formData.email} onChange={handleChange} style={{ marginBottom: '20px' }} />
                                <TextField name="password" label="Password" variant="outlined" type="password" fullWidth value={formData.password} onChange={handleChange} style={{ marginBottom: '20px' }} />
                                <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: '#20c997', color: '#ffffff' }}>Sign In</Button>
                            </form>
                            {error && <div className="error" style={{ textAlign: 'center', marginTop: '20px' }}>{error}</div>}
                        </Grid>
                        <Grid item xs={12} md={6} style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="body1" gutterBottom style={{ marginBottom: '20px', textAlign: 'center', color: '#000' }}>
                                Don't have an account?
                            </Typography>
                            <Button component={Link} to="/StudentSignUpPage" variant="contained" color="secondary" style={{ backgroundColor: '#20c997', color: '#ffffff', border: '1px solid #20c997', borderRadius: '12px' }}>Sign Up</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
};

export default StudentSignInPage;
