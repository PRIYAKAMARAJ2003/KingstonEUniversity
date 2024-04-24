import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Drawer, List, ListItem, ListItemText, Divider, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const CourseApprovePage = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
 
  useEffect(() => {
    fetchPendingCourses();
  }, []);
 
  const fetchPendingCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
 
      const response = await axios.get('https://localhost:7281/api/Courses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
 
      const pendingCourses = response.data.filter(course => course.isApprovedByRegistrar === 'pending');
      setCourses(pendingCourses);
    } catch (error) {
      console.error('Error fetching pending courses:', error);
    }
  };
 
  const handleApprove = async (id) => {
    try {
      if (!id) {
        console.error('Course ID is undefined');
        return;
      }
 
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
 
      // Update the status to 'approved'
      const updatedCourse = { ...courses.find(course => course.courseId === id) };
      updatedCourse.isApprovedByRegistrar = 'approved';
      
 
      // Send the updated course object to the backend
      await axios.put(`https://localhost:7281/api/Courses/${id}`, updatedCourse, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
 
      fetchPendingCourses();
    } catch (error) {
      console.error('Error approving course:', error);
    }
  };
 
 
  const handleReject = async (id) => {
    try {
      if (!id) {
        console.error('Course ID is undefined');
        return;
      }
 
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
 
      // Update the status to 'rejected'
      const updatedCourse = { ...courses.find(course => course.courseId === id) };
      updatedCourse.isApprovedByRegistrar = 'rejected';
      
      // Send the updated course object to the backend
      await axios.put(`https://localhost:7281/api/Courses/${id}`, updatedCourse, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
 
      fetchPendingCourses();
    } catch (error) {
      console.error('Error rejecting course:', error);
    }
  };
 
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };
 
  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open side navigation"
            onClick={() => setOpen(!open)}
            sx={{ mr: 2 }}
          >
            <Typography variant="h6" noWrap>
              Admin Approval - Courses
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ width: 240 }}
      >
        <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <ListItem button component={Link} to="/approval-student">
              <ListItemText primary="Student Approval" />
            </ListItem>
            <ListItem button component={Link} to="/approval-professor">
              <ListItemText primary="Professor Approval" />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
      <main style={{ flexGrow: 1, padding: '64px 24px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Descripion</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Batch</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Timings</TableCell>
                <TableCell>Professor Id</TableCell>
                <TableCell>IsApprovedByRegistrar</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.courseId}>
                  <TableCell>{course.courseId}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>{course.batch}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>{course.timings}</TableCell>
                  <TableCell>{course.professorsId}</TableCell>
                  <TableCell>{course.isApprovedByRegistrar}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleApprove(course.courseId)}>Approve</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleReject(course.courseId)}>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
};
 
export default CourseApprovePage;
