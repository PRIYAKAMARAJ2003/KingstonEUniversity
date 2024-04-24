import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApprovedEnrollment = () => {
  const [approvedEnrollments, setApprovedEnrollments] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student ID from local storage
    const email = localStorage.getItem('studentEmail');
    if (!email) {
      console.error('Email not found in local storage');
      return;
    }
    fetchStudentId(email);
  }, []);

  const fetchStudentId = async (email) => {
    try {
      const response = await axios.get(`https://localhost:7281/api/Students?email=${email}`);
      const student = response.data.find(student => student.email === email);
  
      if (!student) {
        console.error('Student not found');
        return;
      }
  
      const studentId = student.studentId;
      setStudentId(studentId);
      fetchApprovedEnrollments(studentId);
    } catch (error) {
      console.error('Error fetching student ID:', error);
    }
  };
  

  const fetchApprovedEnrollments = async (studentId) => {
    try {
      const response = await axios.get(`https://localhost:7281/api/Enrollments?studentId=${studentId}&isApprovedByRegistrar=approved`);
      // Filter enrollments based on studentId
      const studentEnrollments = response.data.filter(enrollment => enrollment.studentId === studentId);
      setApprovedEnrollments(studentEnrollments);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error('Error fetching approved enrollments:', error);
    }
  };

  return (
    <div>
      <h2>Approved Enrollments for Student ID: {studentId}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        approvedEnrollments.length === 0 ? (
          <p>No enrolled courses</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Enrollment ID</th>
                <th>Course ID</th>
                <th>Payment Amount</th>
              </tr>
            </thead>
            <tbody>
              {approvedEnrollments.map(enrollment => (
                <tr key={enrollment.enrollmentId}>
                  <td>{enrollment.enrollmentId}</td>
                  <td>{enrollment.courseId}</td>
                  <td>{enrollment.paymentAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default ApprovedEnrollment;
