
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const LessonDetailsPage = () => {
//   const [lessons, setLessons] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLessons = async () => {
//       try {
//         // Fetch student ID using the email stored in local storage
//         const email = localStorage.getItem('studentEmail');
//         if (!email) {
//           console.error('Email not found in local storage');
//           setLoading(false);
//           return;
//         }

//         // Fetch student details to get student ID
//         const studentResponse = await axios.get(`https://localhost:7281/api/Students?email=${email}`);
//         const student = studentResponse.data.find(student => student.email === email);
//         const studentId = student?.studentId;

//         if (!studentId) {
//           console.error('Student ID not found');
//           setLoading(false);
//           return;
//         }

//         // Fetch all enrollments
//         const enrollmentResponse = await axios.get(`https://localhost:7281/api/Enrollments`);
//         if (enrollmentResponse.status === 200) {
//           const allEnrollments = enrollmentResponse.data;
//           console.log('All Enrollments:', allEnrollments);

//           // Filter enrollments by student ID and approval status
//           const approvedEnrollments = allEnrollments.filter(enrollment =>
//             enrollment.studentId === studentId && enrollment.isApproved === 'approved'
//           );

//           if (approvedEnrollments.length === 0) {
//             console.log('No approved enrollments found for the student');
//             setLoading(false);
//             return;
//           }

//           // Extract course IDs from approved enrollments
//           const courseIds = approvedEnrollments.map(enrollment => enrollment.courseId);

//           // Fetch lessons for each approved enrollment
//           const lessonPromises = courseIds.map(async courseId => {
//             const lessonResponse = await axios.get(`https://localhost:7281/api/Lessons?courseId=${courseId}`);
//             return lessonResponse.data;
//           });

//           // Wait for all lesson fetch requests to complete
//           const lessonResponses = await Promise.all(lessonPromises);

//           // Flatten lesson details array
//           const allLessons = lessonResponses.flat();

//           setLessons(allLessons);
//           setLoading(false);
//         } else {
//           console.error('Error fetching enrollments:', enrollmentResponse.statusText);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error('Error fetching lessons:', error);
//         setLoading(false);
//       }
//     };

//     fetchLessons();
//   }, []);

//   return (
//     <div>
//       <h1>Lesson Page</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : lessons.length === 0 ? (
//         <p>No lessons found for approved enrollments</p>
//       ) : (
//         lessons.map(lesson => (
//           <div key={lesson.lessonid}>
//             <h2>{lesson.lessonName}</h2>
//             <p>{lesson.description}</p>
//             <p>{lesson.lessonNumber}</p>
//             <button>Complete Course</button>
//             <hr />
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default LessonDetailsPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, Text, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@material-ui/core';

const styles = StyleSheet.create({
  certificateContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Helvetica',
    padding: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
});

const Certificate = ({ studentName, courseName, professorName, startDate, endDate }) => (
  <Document>
    <Page size="A4" style={styles.certificateContainer}>
      <Text style={styles.title}>Certificate of Completion</Text>
      <Text style={styles.paragraph}>
        This is to certify that {studentName} has successfully completed the course "{courseName}".
      </Text>
      <Text style={styles.paragraph}>Professor: {professorName}</Text>
      <Text style={styles.paragraph}>Batch: {startDate} - {endDate}</Text>
    </Page>
  </Document>
);

const LessonDetailsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState({});
  const [studentName, setStudentName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [professorName, setProfessorName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        // Fetch student ID using the email stored in local storage
        const email = localStorage.getItem('studentEmail');
        if (!email) {
          console.error('Email not found in local storage');
          setLoading(false);
          return;
        }

        // Fetch student details to get student ID
        const studentResponse = await axios.get(`https://localhost:7281/api/Students?email=${email}`);
        const student = studentResponse.data.find(student => student.email === email);
        const studentId = student?.studentId;
        const studentName = student?.studentName;

        if (!studentId) {
          console.error('Student ID not found');
          setLoading(false);
          return;
        }

        // Fetch all enrollments
        const enrollmentResponse = await axios.get(`https://localhost:7281/api/Enrollments`);
        if (enrollmentResponse.status === 200) {
          const allEnrollments = enrollmentResponse.data;

          // Filter enrollments by student ID and approval status
          const approvedEnrollments = allEnrollments.filter(enrollment =>
            enrollment.studentId === studentId && enrollment.isApproved === 'approved'
          );

          if (approvedEnrollments.length === 0) {
            console.log('No approved enrollments found for the student');
            setLoading(false);
            return;
          }

          // Extract course IDs from approved enrollments
          const courseIds = approvedEnrollments.map(enrollment => enrollment.courseId);

          // Fetch lessons for each approved enrollment
          const lessonPromises = courseIds.map(async courseId => {
            const lessonResponse = await axios.get(`https://localhost:7281/api/Lessons?courseId=${courseId}`);
            return lessonResponse.data;
          });

          // Wait for all lesson fetch requests to complete
          const lessonResponses = await Promise.all(lessonPromises);

          // Flatten lesson details array
          const allLessons = lessonResponses.flat();

          // Initialize completion status of lessons
          const initialCompletedLessons = allLessons.reduce((acc, lesson) => {
            acc[lesson.lessonId] = false;
            return acc;
          }, {});

          setCompletedLessons(initialCompletedLessons);
          setLessons(allLessons);
          setStudentName(studentName);
          setLoading(false);
        } else {
          console.error('Error fetching enrollments:', enrollmentResponse.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setLoading(false);
      }
    };

    fetchLessonData();
  }, []);

  const handleCompleteLesson = (lessonId) => {
    setCompletedLessons(prevState => ({
      ...prevState,
      [lessonId]: true
    }));
  };

  const allCompleted = Object.values(completedLessons).every(value => value === true);

  console.log(allCompleted);

  const handleCompleteCourse = async (courseId) => {
    try {
      if (allCompleted) {
        // Update the courseCompletionStatus in the enrollment table
        await axios.put(`https://localhost:7281/api/Enrollments/${courseId}`, { courseCompletionStatus: true });
      }
    } catch (error) {
      console.error('Error completing course:', error);
    }
  };

  return (
    <div>
      <h1>Lesson Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : lessons.length === 0 ? (
        <p>No lessons found for approved enrollments</p>
      ) : (
        <div>
          {lessons.map(lesson => (
            <div key={lesson.lessonId}>
              <h2>{lesson.lessonName}</h2>
              <p>{lesson.description}</p>
              <p>{lesson.lessonNumber}</p>
              <button disabled={completedLessons[lesson.lessonId]} onClick={() => handleCompleteLesson(lesson.lessonId)}>Complete Lesson</button>
              <hr />
            </div>
          ))}
          <PDFDownloadLink document={<Certificate studentName={studentName} courseName={courseName} professorName={professorName} startDate={startDate} endDate={endDate} />} fileName={`${studentName}_certificate.pdf`}>
            {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : <Button variant="contained">Download Certificate</Button>)}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default LessonDetailsPage;
