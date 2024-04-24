import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function EnrollmentPage() {
  const [enrollmentData, setEnrollmentData] = useState({
    studentId: '',
    studentFirstName: '',
    courseId: '',
    professorsId: '',
    paymentAmount: '',
  });

  // Get location object using useLocation hook
  const location = useLocation();

  useEffect(() => {
    // Extract courseId from the location search string
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      console.error('Course ID not found in URL');
      return;
    }

    // Fetch course details based on courseId
    fetchCourseDetails(courseId);
  }, [location.search]);

  useEffect(() => {
    const email = localStorage.getItem('studentEmail');
    if (!email) {
      console.error('Email not found in local storage');
      return;
    }
    fetchStudentDetails(email);
  }, []);

  const fetchStudentDetails = async (email) => {
    try {
      const response = await fetch(`https://localhost:7281/api/Students?email=${email}`);
      const data = await response.json();
      const student = data.find(student => student.email === email); // Find student with matching email
      if (student) {
        setEnrollmentData(prevData => ({
          ...prevData,
          studentId: student.studentId,
          studentFirstName: student.firstName,
        }));
      } else {
        console.error('Student not found');
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const fetchCourseDetails = async (courseId) => {
    try {
      // Make API call to fetch course details
      const response = await fetch(`https://localhost:7281/api/Courses/${courseId}`);
      const courseData = await response.json();

      // Update enrollmentData state with fetched course details
      setEnrollmentData(prevData => ({
        ...prevData,
        courseId: courseData.courseId,
        professorsId: courseData.professorsId,
        paymentAmount: courseData.price,
      }));
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://localhost:7281/api/Enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData),
      });

      if (response.ok) {
        console.log('Enrollment successful');
      } else {
        console.error('Error enrolling:', response.statusText);
      }
    } catch (error) {
      console.error('Error enrolling:', error);
    }
  };

  return (
    <div>
      <h2>Enrollment Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentId">Student ID:</label>
          <input type="text" id="studentId" name="studentId" value={enrollmentData.studentId} readOnly />
        </div>
        <div>
          <label htmlFor="studentFirstName">Student Name:</label>
          <input type="text" id="studentFirstName" name="studentFirstName" value={enrollmentData.studentFirstName} readOnly />
        </div>
        <div>
          <label htmlFor="courseId">Course ID:</label>
          <input type="text" id="courseId" name="courseId" value={enrollmentData.courseId} onChange={(e) => setEnrollmentData({ ...enrollmentData, courseId: e.target.value })} />
        </div>
        <div>
          <label htmlFor="professorsId">Professor ID:</label>
          <input type="text" id="professorsId" name="professorsId" value={enrollmentData.professorsId} onChange={(e) => setEnrollmentData({ ...enrollmentData, professorsId: e.target.value })} />
        </div>
        <div>
          <label htmlFor="paymentAmount">Payment Amount:</label>
          <input type="text" id="paymentAmount" name="paymentAmount" value={enrollmentData.paymentAmount} onChange={(e) => setEnrollmentData({ ...enrollmentData, paymentAmount: e.target.value })} />
        </div>
        <button type="submit">Enroll</button>
      </form>
    </div>
  );
}

export default EnrollmentPage;
