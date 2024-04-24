import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const LessonPage = () => {
  const [lessonData, setLessonData] = useState({
    lessonName: '',
    description: '',
    lessonNumber: '',
    videoUrl: '',
    courseId: '',
    professorsId: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
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
      setLessonData(prevState => ({
        ...prevState,
        professorsId
      })); // Update the state with the professor ID
    } catch (error) {
      console.error('Error fetching professor ID:', error);
    }
  };

  const handleChange = (e) => {
    setLessonData({
      ...lessonData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7281/api/Lessons', lessonData);
      console.log('Lesson created:', response.data);
      setSuccessMessage('Lesson created successfully!');
      setOpenSnackbar(true);
      // Optionally, perform any additional actions after successful creation
    } catch (error) {
      console.error('Error creating lesson:', error);
      // Handle error, e.g., display error message to the user
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Create Lesson</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lessonName">Lesson Name:</label>
          <input
            type="text"
            id="lessonName"
            name="lessonName"
            value={lessonData.lessonName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={lessonData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lessonNumber">Lesson Number:</label>
          <input
            type="text"
            id="lessonNumber"
            name="lessonNumber"
            value={lessonData.lessonNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="videoUrl">Video URL:</label>
          <input
            type="text"
            id="videoUrl"
            name="videoUrl"
            value={lessonData.videoUrl}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="courseId">Course ID:</label>
          <input
            type="text"
            id="courseId"
            name="courseId"
            value={lessonData.courseId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="professorsId">Professor ID:</label>
          <input
            type="text"
            id="professorsId"
            name="professorsId"
            value={lessonData.professorsId}
            onChange={handleChange}
            readOnly // Make the field read-only
          />
        </div>
        <button type="submit">Create Lesson</button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default LessonPage;
