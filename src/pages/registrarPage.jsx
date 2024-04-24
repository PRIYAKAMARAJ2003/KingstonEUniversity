import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegistrarPage = () => {
  const navigate = useNavigate();

  const handleStudentApproval = () => {
    // Navigate to the Student Approval page
    navigate('/studentApprovePage');
  };

  const handleProfessorApproval = () => {
    // Navigate to the Student Approval page
    navigate('/professorApprovePage');
  };
  const handleCourseApproval = () => {
    // Navigate to the Student Approval page
    navigate('/courseApprovePage');
  };

  const handleEnrollmentApproval = () => {
    // Navigate to the Student Approval page
    navigate('/enrollmentApprovePage');
  };
  return (
    <div>
      <h1>Registrar Page</h1>
      <Button variant="contained" color="primary" onClick={handleStudentApproval}>
        Student Approval
      </Button>
      <Button variant="contained" color="primary" onClick={handleProfessorApproval}>
        Professor Approval
      </Button>
      <Button variant="contained" color="primary" onClick={handleCourseApproval}>
        Course Approval
      </Button>
      <Button variant="contained" color="primary" onClick={handleEnrollmentApproval}>
        Enrollment Approval
      </Button>
    </div>
  );
};

export default RegistrarPage;
