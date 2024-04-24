import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Drawer, List, ListItem, ListItemText, Divider, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const EnrollmentApprovePage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [open, setOpen] = useState(false);
 
  useEffect(() => {
    fetchPendingEnrollments();
  }, []);
 
  const fetchPendingEnrollments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
 
      const response = await axios.get('https://localhost:7281/api/Enrollments', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
 
      const pendingEnrollments = response.data.filter(enrollment => enrollment.isApproved === 'pending');
      setEnrollments(pendingEnrollments);
    } catch (error) {
      console.error('Error fetching pending enrollments:', error);
    }
  };
 
  const handleApprove = async (id) => {
    try {
      if (!id) {
        console.error('Enrollment ID is undefined');
        return;
      }
 
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
 
      // Update the status to 'approved'
      const updatedEnrollment = { ...enrollments.find(enrollment => enrollment.enrollmentId === id) };
      updatedEnrollment.isApproved = 'approved';
      
      // Send the updated enrollment object to the backend
      await axios.put(`https://localhost:7281/api/Enrollments/${id}`, updatedEnrollment, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
 
      fetchPendingEnrollments();
    } catch (error) {
      console.error('Error approving enrollment:', error);
    }
  };
 
 
  const handleReject = async (id) => {
    try {
      if (!id) {
        console.error('Enrollment ID is undefined');
        return;
      }
 
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
 
      // Update the status to 'rejected'
      const updatedEnrollment = { ...enrollments.find(enrollment => enrollment.enrollmentId === id) };
      updatedEnrollment.isApproved = 'rejected';
      
      // Send the updated enrollment object to the backend
      await axios.put(`https://localhost:7281/api/Enrollments/${id}`, updatedEnrollment, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
 
      fetchPendingEnrollments();
    } catch (error) {
      console.error('Error rejecting enrollment:', error);
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
              Admin Approval - Enrollments
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
        </div>
      </Drawer>
      <main style={{ flexGrow: 1, padding: '64px 24px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Enrollment ID</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Course ID</TableCell>
                <TableCell>Professor ID</TableCell>
                <TableCell>Payment Amount</TableCell>
                <TableCell>IsApproved</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.map((enrollment) => (
                <TableRow key={enrollment.enrollmentId}>
                  <TableCell>{enrollment.enrollmentId}</TableCell>
                  <TableCell>{enrollment.studentId}</TableCell>
                  <TableCell>{enrollment.studentFirstName}</TableCell>
                  <TableCell>{enrollment.courseId}</TableCell>
                  <TableCell>{enrollment.professorsId}</TableCell>
                  <TableCell>{enrollment.paymentAmount}</TableCell>
                  <TableCell>{enrollment.isApproved}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleApprove(enrollment.enrollmentId)}>Approve</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleReject(enrollment.enrollmentId)}>Reject</Button>
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
 
export default EnrollmentApprovePage;
