// import React, { useState, useEffect } from 'react';
// import validator from 'validator'; // Import the validator library
// function ProfessorApprove() {
//   const [professors, setProfessors] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     fetch('https://localhost:7281/api/Professors', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Fetched professors:', data);
//       setProfessors(data);
//     })
//     .catch(error => console.error('Error fetching professors:', error));
//   }, []);

//   const approveProfessor = async (professorsId, name, email, password, education) => {
//     console.log('Approving professor with id:', professorsId);
//     if (!professorsId) {
//       console.error('Invalid professor id');
//       return;
//     }
//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch(`https://localhost:7281/api/Professors/${professorsId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ 
//           name: name || '', // Provide a default value or fetch the name from the professor data
//           email: email || '', // Provide a default value or fetch the email from the professor data
//           password: password || '', // Include the password field
//           educational_Qualification: education || '', // Provide a default value or fetch the education from the professor data
//           status: 'approve',
//           isApproved: 'approve'
//         })
//       });
//       if (response.ok) {
//         // Update professors list after approval
//         const updatedProfessors = professors.map(professor => {
//           if (professor.professorsId === professorsId) {
//             return { ...professor, status: 'approve', isApproved: 'approve' };
//           }
//           return professor;
//         });
//         setProfessors(updatedProfessors);
//       } else {
//         console.error('Approval failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error approving professor:', error);
//     }
//   };
  
//   const rejectProfessor = async (professorsId, name, email, password, education) => {
//     console.log('Rejecting professor with id:', professorsId);
//     if (!professorsId) {
//       console.error('Invalid professor id');
//       return;
//     }
//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch(`https://localhost:7281/api/Professors/${professorsId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ 
//           name: name || '', // Provide a default value or fetch the name from the professor data
//           email: email || '', // Provide a default value or fetch the email from the professor data
//           password: password || '', // Include the password field
//           educational_Qualification: education || '', // Provide a default value or fetch the education from the professor data
//           status: 'reject',
//           isApproved: 'reject'
//         })
//       });
//       if (response.ok) {
//         // Update professors list after rejection
//         const updatedProfessors = professors.map(professor => {
//           if (professor.professorsId === professorsId) {
//             return { ...professor, status: 'reject', isApproved: 'reject' };
//           }
//           return professor;
//         });
//         setProfessors(updatedProfessors);
//       } else {
//         console.error('Rejection failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error rejecting professor:', error);
//     }
//   };
//   return (
//     <div>
//       <h1>Professor List</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Education Qualification</th>
//             <th>Password</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {professors.map(professor => (
//             <tr key={professor.professorsId}>
//               <td>{professor.name}</td>
//               <td>{professor.email}</td>
//               <td>{professor.educational_Qualification}</td>
//               <td>{professor.password}</td>
//               <td>{professor.status}</td>
//               <td>
//                 <button onClick={() => approveProfessor(professor.professorsId)}>Approve</button>
//                 <button onClick={() => rejectProfessor(professor.professorsId)}>Reject</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ProfessorApprove;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Drawer, List, ListItem, ListItemText, Divider, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const ProfessorApprovePage = () => {
  const [professors, setProfessors] = useState([]);
  const [open, setOpen] = useState(false);
 
  useEffect(() => {
    fetchPendingProfessors();
  }, []);
 
  const fetchPendingProfessors = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
 
      const response = await axios.get('https://localhost:7281/api/Professors', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
 
      const pendingProfessors = response.data.filter(professor => professor.status === 'pending');
      setProfessors(pendingProfessors);
    } catch (error) {
      console.error('Error fetching pending professors:', error);
    }
  };
 
  const handleApprove = async (id) => {
    try {
      if (!id) {
        console.error('Professor ID is undefined');
        return;
      }
  
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
  
      // Update the status to 'approved'
      const updatedProfessor = { ...professors.find(professor => professor.professorsId === id) };
      updatedProfessor.isapproved = 'approved';
      updatedProfessor.status = 'approved';
  
      // Send the updated professor object to the backend
      await axios.put(`https://localhost:7281/api/Professors/${id}`, updatedProfessor, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      fetchPendingProfessors();
    } catch (error) {
      console.error('Error approving professor:', error);
    }
  };
  
  
  const handleReject = async (id) => {
    try {
      if (!id) {
        console.error('Professor ID is undefined');
        return;
      }
  
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
  
      // Update the status to 'rejected'
      const updatedProfessor = { ...professors.find(professor => professor.professorsId === id) };
      updatedProfessor.isapproved = 'rejected';
      updatedProfessor.status = 'rejected';
  
      // Send the updated professor object to the backend
      await axios.put(`https://localhost:7281/api/Professors/${id}`, updatedProfessor, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      fetchPendingProfessors();
    } catch (error) {
      console.error('Error rejecting professor:', error);
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
              Admin Approval - Professors
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
                <TableCell>Professor ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Educational_Qualification</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {professors.map((professor) => (
                <TableRow key={professor.professorsId}>
                  <TableCell>{professor.professorsId}</TableCell>
                  <TableCell>{professor.name}</TableCell>
                  <TableCell>{professor.email}</TableCell>
                  <TableCell>{professor.password}</TableCell>
                  <TableCell>{professor.educational_Qualification}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleApprove(professor.professorsId)}>Approve</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleReject(professor.professorsId)}>Reject</Button>
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
 
export default ProfessorApprovePage;
