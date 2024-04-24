import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid, Link } from '@mui/material'; // Import Material-UI components
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; // Import Axios

const StudentSignUpPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        department: '',
        dob: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7281/api/Students', formData);
            console.log(response.data); // Log the response data (optional)
            // Redirect to sign-in page after successful sign-up
            navigate('/studentSignInPage');
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#ffffff' }}>
                            <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', textAlign: 'center' }}>Sign Up</Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField name="firstName" label="First Name" variant="outlined" fullWidth value={formData.firstName} onChange={handleChange} style={{ marginBottom: '20px' }} />
                                <TextField name="lastName" label="Last Name" variant="outlined" fullWidth value={formData.lastName} onChange={handleChange} style={{ marginBottom: '20px' }} />
                                <TextField name="email" label="Email" variant="outlined" fullWidth value={formData.email} onChange={handleChange} style={{ marginBottom: '20px' }} />
                                <TextField name="phoneNumber" label="Phone Number" variant="outlined" fullWidth value={formData.phoneNumber} onChange={handleChange} style={{ marginBottom: '20px' }} />
                                <TextField name="department" label="Department" variant="outlined" fullWidth value={formData.department} onChange={handleChange} style={{ marginBottom: '20px' }} />
                                <TextField name="dob" label="Date of Birth" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleChange} style={{ marginBottom: '20px' }} />
                                <TextField name="password" label="Password" type="password" variant="outlined" fullWidth value={formData.password} onChange={handleChange} style={{ marginBottom: '20px' }} />
                                <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: '#20c997', color: '#ffffff' }}>Sign Up</Button>
                            </form>
                            {error && <div className="error" style={{ textAlign: 'center', marginTop: '20px' }}>{error}</div>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="body1" gutterBottom style={{ marginBottom: '20px', textAlign: 'center', color: '#000' }}>
                            Already have an account?
                        </Typography>
                        <Button component={Link} to="/studentSignInPage" variant="contained" color="secondary" style={{ backgroundColor: '#20c997', color: '#ffffff', border: '1px solid #20c997', borderRadius: '12px' }}>Sign In</Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default StudentSignUpPage;
