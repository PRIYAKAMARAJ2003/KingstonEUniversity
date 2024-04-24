import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import backgroundImage from '../image/course.jpg'; // Import your image

const CoursePage = () => {
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    price: '',
    batch: '',
    duration: '',
    timings: '',
    professorsId: '' // New field for professor ID
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Fetch professor ID when the component mounts
    fetchProfessorId();
  }, []);

  const fetchProfessorId = async () => {
    try {
      // Retrieve the email stored in local storage
      const email = localStorage.getItem('professorEmail');
      if (!email) {
        console.error('Email not found in local storage');
        return;
      }

      // Fetch the professor details using the email
      const response = await axios.get(`https://localhost:7281/api/Professors?email=${email}`);
      const professor = response.data.find(prof => prof.email === email); // Find professor with matching email
      if (!professor) {
        console.error('Professor not found for email:', email);
        return;
      }
      const professorsId = professor.professorsId;
      setCourseData(prevState => ({
        ...prevState,
        professorsId
      })); // Update the state with the professor ID
    } catch (error) {
      console.error('Error fetching professor ID:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send course data to the backend API
      await axios.post('https://localhost:7281/api/Courses', courseData);
      // Clear the form fields after submission
      setCourseData({
        name: '',
        description: '',
        price: '',
        batch: '',
        duration: '',
        timings: '',
        professorsId: '' // Clear professor ID as well
      });
      setOpenSnackbar(true); // Open Snackbar on successful course addition
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '40%', padding: '2rem', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Add New Course</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <label htmlFor="name" style={{ marginRight: '0.5rem', minWidth: '100px' }}>Name:</label>
            <input type="text" id="name" name="name" value={courseData.name} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <label htmlFor="description" style={{ marginRight: '0.5rem', minWidth: '100px' }}>Description:</label>
            <textarea id="description" name="description" value={courseData.description} onChange={handleChange} required style={{ resize: 'none' }} />
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <label htmlFor="price" style={{ marginRight: '0.5rem', minWidth: '100px' }}>Price:</label>
            <input type="number" id="price" name="price" value={courseData.price} onChange={handleChange} required style={{ '-moz-appearance': 'textfield' }} />
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <label htmlFor="batch" style={{ marginRight: '0.5rem', minWidth: '100px' }}>Batch:</label>
            <input type="text" id="batch" name="batch" value={courseData.batch} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <label htmlFor="duration" style={{ marginRight: '0.5rem', minWidth: '100px' }}>Duration:</label>
            <input type="text" id="duration" name="duration" value={courseData.duration} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <label htmlFor="timings" style={{ marginRight: '0.5rem', minWidth: '100px' }}>Timings:</label>
            <input type="text" id="timings" name="timings" value={courseData.timings} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <label htmlFor="professorsId" style={{ marginRight: '0.5rem', minWidth: '100px' }}>Professor ID:</label>
            <input type="text" id="professorsId" name="professorsId" value={courseData.professorsId} onChange={handleChange} readOnly required />
          </div>
          <button type="submit" style={{ backgroundColor: '#20c997', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'block', margin: 'auto' }}>Add Course</button>
        </form>
      </div>
      <div style={{ width: '60%' }}>
        <img src={backgroundImage} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Course added successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default CoursePage;
