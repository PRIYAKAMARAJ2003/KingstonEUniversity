import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const ITEMS_PER_PAGE = 3;

const ApprovedCoursesPage = () => {
  const [approvedCourses, setApprovedCourses] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchApprovedCourses();
  }, [page]); // Fetch data when page changes

  const fetchApprovedCourses = async () => {
    try {
      const response = await axios.get('https://localhost:7281/api/Courses');
      const approvedCourses = response.data.filter(course => course.isApprovedByRegistrar === 'approved');
      setApprovedCourses(approvedCourses);
    } catch (error) {
      console.error('Error fetching approved courses:', error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedCourses = approvedCourses.slice(startIndex, endIndex);

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '50px' }}>
        Approved Courses
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {paginatedCourses.map(course => (
          <Grid item key={course.courseId}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', minHeight: '200px', marginTop: '100px' }}>
              <Typography variant="h6" gutterBottom><b>{course.name}</b></Typography>
              <Typography variant="body1" gutterBottom>{course.description}</Typography>
              <Typography variant="body1" gutterBottom>Price: {course.price}</Typography>
              <Typography variant="body1" gutterBottom>Batch: {course.batch}</Typography>
              <Typography variant="body1" gutterBottom>Duration: {course.duration}</Typography>
              <Typography variant="body1" gutterBottom>Timings: {course.timings}</Typography>
              <Typography variant="body1" gutterBottom>Professor ID: {course.professorsId}</Typography>
              <div style={{ marginTop: '20px' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#20c997', color: '#fff' }}
                  component={RouterLink}
                  to={`/enrollmentPage?courseId=${course.courseId}&professorsId=${course.professorsId}&paymentAmount=${course.price}`}
                >
                  Enroll Now
                </Button>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" marginTop="20px" >
        <Pagination
          count={Math.ceil(approvedCourses.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default ApprovedCoursesPage;
