// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const StudentApprovePage = () => {
//   const [students, setStudents] = useState([]);

//   // Function to fetch student data from API
//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('https://localhost:7281/api/Students');
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   // Fetch student data when component mounts
//   useEffect(() => {
//     fetchStudents();
//   }, []); // Empty dependency array to run effect only once

//   // Function to handle approval, suspension, or rejection of a student
//   const handleAction = async (id, firstName, lastName, email, password, isApproved, status, action) => {
//     try {
//       const updatedStudentData = {
//         studentId: id,
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         password: password,
//         isApproved: action === 'approve' ? 'approved' : isApproved,
//         status: action === 'approve' ? 'approved' : action === 'suspend' ? 'suspended' : 'rejected'
//       };

//       const response = await axios.put(`https://localhost:7281/api/Students/${id}`, updatedStudentData);
//       if (response.status === 204) {
//         // If successful, update student list
//         fetchStudents();
//         alert(`Student ${action}d successfully!`);
//       }
//     } catch (error) {
//       console.error(`Error ${action}ing student:`, error);
//     }
//   };

//   return (
//     <div>
//       <h1>Student List</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Password</th>
//             <th>IsApproved</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map(student => (
//             <tr key={student.studentId}>
//               <td>{student.firstName}</td>
//               <td>{student.lastName}</td>
//               <td>{student.email}</td>
//               <td>{student.password}</td>
//               <td>{student.isApproved}</td>
//               <td>{student.status}</td>
//               <td>
//                 <button onClick={() => handleAction(student.studentId, student.firstName, student.lastName, student.email, student.password, student.isApproved, student.status, 'approve')}>
//                   Approve
//                 </button>
//                 <button onClick={() => handleAction(student.studentId, student.firstName, student.lastName, student.email, student.password, student.isApproved, student.status, 'suspend')}>
//                   Suspend
//                 </button>
//                 <button onClick={() => handleAction(student.studentId, student.firstName, student.lastName, student.email, student.password, student.isApproved, student.status, 'reject')}>
//                   Reject
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentApprovePage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const StudentApprovePage = () => {
//   const [students, setStudents] = useState([]);

//   // Function to fetch student data from API
//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('https://localhost:7281/api/Students');
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   // Fetch student data when component mounts
//   useEffect(() => {
//     fetchStudents();
//   }, []); // Empty dependency array to run effect only once

//   const handleAction = async (id, isApproved, status, action) => {
//     try {
//       const updatedStatus = action === 'approve' ? 'approved' : action === 'suspend' ? 'suspended' : 'rejected';
//       const updatedIsApproved = action === 'approve' ? 'approved' : action === 'suspend' ? 'suspended' : 'rejected';
  
//       const response = await axios.put(`https://localhost:7281/api/Students/${id}`, {
//         studentId: id, // Assuming "studentId" is required by the server
//         isApproved: updatedIsApproved,
//         status: updatedStatus
//       });
  
//       if (response.status >= 200 && response.status < 300) {
//         // If successful, update student list
//         fetchStudents();
//         alert(`Student ${action}d successfully!`);
//       } else {
//         alert(`Failed to ${action} student. Please try again.`);
//       }
//     } catch (error) {
//       console.error(`Error ${action}ing student:`, error);
//       alert(`Error ${action}ing student. Please try again.`);
//     }
//   };
  
  

//   return (
//     <div>
//       <h1>Student List</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Password</th>
//             <th>IsApproved</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map(student => (
//             <tr key={student.studentId}>
//               <td>{student.firstName}</td>
//               <td>{student.lastName}</td>
//               <td>{student.email}</td>
//               <td>{student.password}</td>
//               <td>{student.isApproved}</td>
//               <td>{student.status}</td>
//               <td>
//                 <button onClick={() => handleAction(student.studentId, student.isApproved, student.status, 'approve')}>
//                   Approve
//                 </button>
//                 <button onClick={() => handleAction(student.studentId, student.isApproved, student.status, 'suspend')}>
//                   Suspend
//                 </button>
//                 <button onClick={() => handleAction(student.studentId, student.isApproved, student.status, 'reject')}>
//                   Reject
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentApprovePage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Drawer, List, ListItem, ListItemText, Divider, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const StudentApprovePage = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
 
  useEffect(() => {
    fetchPendingStudents();
  }, []);
 
  const fetchPendingStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
 
      const response = await axios.get('https://localhost:7281/api/Students', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
 
      const pendingStudents = response.data.filter(student => student.status === 'Pending');
      setStudents(pendingStudents);
    } catch (error) {
      console.error('Error fetching pending students:', error);
    }
  };
 
  const handleApprove = async (id) => {
    try {
      if (!id) {
        console.error('Student ID is undefined');
        return;
      }
 
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
 
      // Update the status to 'approved'
      const updatedStudent = { ...students.find(student => student.studentId === id) };
      updatedStudent.isapproved = 'approved';
      updatedStudent.status = 'approved';
 
      // Send the updated student object to the backend
      await axios.put(`https://localhost:7281/api/Students/${id}`, updatedStudent, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
 
      fetchPendingStudents();
    } catch (error) {
      console.error('Error approving student:', error);
    }
  };
 
 
  const handleReject = async (id) => {
    try {
      if (!id) {
        console.error('Student ID is undefined');
        return;
      }
 
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
 
      // Update the status to 'rejected'
      const updatedStudent = { ...students.find(student => student.studentId === id) };
      updatedStudent.isapproved = 'rejected';
      updatedStudent.status = 'rejected';
 
      // Send the updated student object to the backend
      await axios.put(`https://localhost:7281/api/Students/${id}`, updatedStudent, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
 
      fetchPendingStudents();
    } catch (error) {
      console.error('Error rejecting student:', error);
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
              Admin Approval - Students
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
                <TableCell>Student ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.password}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleApprove(student.studentId)}>Approve</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleReject(student.studentId)}>Reject</Button>
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
 
export default StudentApprovePage;
