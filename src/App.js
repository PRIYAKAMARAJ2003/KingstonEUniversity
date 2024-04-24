import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import StudentSignInPage from "./pages/studentSignInPage";
import StudentSignUpPage from "./pages/studentSignUpPage";
import StudentApprovePage from "./pages/studentApprovePage";
import RegistrarPage from "./pages/registrarPage";
import RegistrarSignInPage from "./pages/registrarSignInPage";
import HomePage from "./pages/home";
import ProfessorSignUpPage from "./pages/professorSignUpPage";
import ProfessorSignInPage from "./pages/professorSignInPage";
import ProfessorPage from "./pages/professorPage";
import CoursePage from "./pages/course";
import ProfessorApprove from "./pages/professorApprovePage";
import CourseApprovePage from "./pages/courseApprovePage";
import StudentPage from "./pages/studentPage";
import ApprovedCoursesPage from "./pages/approvedCourses";
import LessonPage from "./pages/lesson";
import LessonDetailsPage from "./pages/lessonDetails";
import EnrollmentPage from "./pages/enrollmentPage";
import EnrollmentApprovePage from "./pages/enrollmentApprovePage";
import ApprovedEnrollment from "./pages/approvedEnrollment";
import CertificateGeneration from "./pages/certificate";
import UpdateCourse from "./pages/courseUpdate";

function App(){
  return(
    <Router>
      <Routes>
      <Route path="/" element={<HomePage/>} />
        <Route path="/studentSignInPage" element={<StudentSignInPage/>} />
        <Route path="/studentSignUpPage" element={<StudentSignUpPage/>} />
        <Route path="/studentApprovePage" element={<StudentApprovePage/>} />
        <Route path="/registrarPage" element={<RegistrarPage/>} />
        <Route path="/registrarSignInPage" element={<RegistrarSignInPage/>} />
        <Route path="/professorSignUpPage" element={<ProfessorSignUpPage />} />
        <Route path="/professorSignInPage" element={<ProfessorSignInPage />} />
        <Route path="/professorPage" element={<ProfessorPage />} />
        <Route path="/coursePage" element={<CoursePage />} />
        <Route path="/professorApprovePage" element={<ProfessorApprove />} />
        <Route path="/courseApprovePage" element={<CourseApprovePage />} />
        <Route path="/studentPage" element={<StudentPage />} />
        <Route path="/approvedCoursePage" element={<ApprovedCoursesPage />} />
        <Route path="/lessonPage" element={<LessonPage />} />
        <Route path="/lessonDetailsPage" element={<LessonDetailsPage />} />
        <Route path="/enrollmentPage" element={<EnrollmentPage />} />
        <Route path="/enrollmentApprovePage" element={<EnrollmentApprovePage />} />
        <Route path="/approvedEnrollmentPage" element={<ApprovedEnrollment />} />
        <Route path="/certificate" element={<CertificateGeneration />} />
        <Route path="/updateCourse" element={<UpdateCourse />} />

      </Routes>
    </Router>
  );
}

export default App;