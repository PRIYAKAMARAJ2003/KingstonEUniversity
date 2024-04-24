import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher, faUserPlus ,faGraduationCap, faUsers,faLaptopCode, faDatabase, faChartBar} from '@fortawesome/free-solid-svg-icons';
import backgroundImg from '../image/background.jpg';
import aboutImg from '../image/about.jpeg';
import student1 from '../image/student1.jpg';
import student2 from '../image/student2.jpg';
import student3 from '../image/student3.jpg';


const HomePage = () => {
    return (
        
        <div>
            {/* Header */}
            <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-between">
    <Container>
        <Navbar.Brand href="#home">Kingston eUniversity</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#about-us">About Us</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
                <NavDropdown title="Sign In" id="signin-dropdown">
                    <NavDropdown.Item as={Link} to="/studentSignInPage">
                        <FontAwesomeIcon icon={faUserGraduate} className="mr-2" />
                        Student Sign In
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/professorSignInPage">
                        <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
                        Professor Sign In
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/registrarSignInPage">
                        <FontAwesomeIcon icon={faUserGraduate} className="mr-2" />
                        Registrar Sign In
                    </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Sign Up" id="signup-dropdown">
                    <NavDropdown.Item as={Link} to="/studentSignUpPage">
                        <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                        Student Sign Up
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/professorSignUpPage">
                        <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
                        Professor Sign Up
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>


            {/* Main Content */}
            <div className="text-center" style={{ position: 'relative', textAlign: 'center' }}>
                <div className="heading-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', color: '#fff', maxWidth: '80%', zIndex: '1' }}>
                    <h1 className="display-4">Welcome to Our University</h1>
                    <p>Empowering Minds, Transforming Lives</p>
                </div>
                <img src={backgroundImg} alt="University Logo" style={{ width: '100vw', height: '100vh', objectFit: 'cover', filter: 'brightness(50%)' }} />
            </div>

            <br />
            <h2 id="about-us" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>About Us</h2>
            <div className="quote" style={{marginLeft: '250px'}}>
                <p>"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela</p>
            </div>
            <div className="about-container" style={{ display: 'flex' }}>
                <div className="content-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <div className="box" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', transition: 'background-color 0.3s', position: 'relative' }}>
                        <h3>Online Courses</h3>
                        <p>Explore our diverse range of online courses designed to help you expand your knowledge and skills from the comfort of your own home.</p>
                        <FontAwesomeIcon icon={faGraduationCap} /> {/* Font Awesome icon */}
                    </div>
                    <div className="box" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', transition: 'background-color 0.3s', position: 'relative' }}>
                        <h3>Expert Instructors</h3>
                        <p>Learn from industry experts and experienced educators who are passionate about sharing their knowledge and expertise with you.</p>
                        <FontAwesomeIcon icon={faChalkboardTeacher} /> {/* Font Awesome icon */}
                    </div>
                    <div className="box" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', transition: 'background-color 0.3s', position: 'relative' }}>
                        <h3>Community Support</h3>
                        <p>Join our vibrant community of learners from around the world and collaborate with fellow students and instructors to enhance your learning experience.</p>
                        <FontAwesomeIcon icon={faUsers} /> {/* Font Awesome icon */}
                    </div>
                    <div className="box" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', transition: 'background-color 0.3s', position: 'relative' }}>
                        <h3>E-Certificate</h3>
                        <p>Learn from industry experts and experienced educators and get the certificate that enhance your career.</p>
                        <FontAwesomeIcon icon={faUsers} /> {/* Font Awesome icon */}
                    </div>
                </div>
                {/* <div className="image-container" style={{ flex: '1' }}>
                    <img src={aboutImg} alt="University Logo" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '5px' }} />
                </div> */}
            </div>
            <br/>
            {/* Course container */}
            <h3 style={{ marginLeft: '300px', marginRight: '300px', color: '#20c997', justifyContent: 'center', textAlign: 'center', fontSize: '30px' }}>Courses</h3>
            <p style={{ marginLeft: '500px', fontWeight: 'bold', fontSize: '50px' }}>Our top courses</p>
            <div className="course-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <div className="course-item" style={{ width: '200px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faLaptopCode} className="course-icon" style={{ marginRight: '10px' }} />
                    <h3 style={{ margin: '0' }}>Web Development</h3>
                </div>
                <div className="course-item" style={{ width: '200px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faDatabase} className="course-icon" style={{ marginRight: '10px' }} />
                    <h3 style={{ margin: '0' }}>Database Management</h3>
                </div>
                <div className="course-item" style={{ width: '200px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faChartBar} className="course-icon" style={{ marginRight: '10px' }} />
                    <h3 style={{ margin: '0' }}>Data Science</h3>
                </div>
                <div className="course-item" style={{ width: '200px', height: '100px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faLaptopCode} className="course-icon" style={{ marginRight: '10px' }} />
                    <h3 style={{ margin: '0' }}>UI/UX</h3>
                </div>
                <div className="course-item" style={{ width: '200px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faChartBar} className="course-icon" style={{ marginRight: '10px' }} />
                    <h3 style={{ margin: '0' }}>Machine Learning</h3>
                </div>
            </div>

            <br />
            {/* Testimonial container */}
            <h3 style={{ marginLeft: '600px', color: '#20c997' }}>Testimonials</h3>
            <p style={{ marginLeft: '400px', fontWeight: 'bold', fontSize: '50px' }}>Our Successful Students</p>
            <div className="testimonial-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '50px' }}>
                <div className="testimonial-item" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', transition: 'background-color 0.3s' }}>
                    <img src={student1} alt="Profile Image" className="testimonial-image" style={{ maxWidth: '100%', height: 'auto', borderRadius: '50%', marginBottom: '10px' }} />
                    <div className="testimonial-name">Kim Jennie</div>
                    <div className="testimonial-profession">Web Developer</div>
                    <div className="testimonial-description">As a web developer, I've seen my fair share of online learning platforms, but Kingston eUniversity truly stands out. Each course is meticulously crafted by industry experts, ensuring that learners receive the most up-to-date and relevant information.</div>
                </div>
                <div className="testimonial-item" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', transition: 'background-color 0.3s' }}>
                    <img src={student2} alt="Profile Image" className="testimonial-image" style={{ maxWidth: '100%', height: 'auto', borderRadius: '50%', marginBottom: '10px' }} />
                    <div className="testimonial-name">Carol Danvers</div>
                    <div className="testimonial-profession">Data Scientist</div>
                    <div className="testimonial-description">As a data scientist, finding the right resources to enhance my skills is crucial for staying competitive in the ever-evolving field of data science. Each course is packed with interactive exercises, case studies, and projects that allow me to gain valuable experience.</div>
                </div>
                <div className="testimonial-item" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', transition: 'background-color 0.3s' }}>
                    <img src={student3} alt="Profile Image" className="testimonial-image" style={{ maxWidth: '100%', height: 'auto', borderRadius: '50%', marginBottom: '10px' }} />
                    <div className="testimonial-name">David Johnson</div>
                    <div className="testimonial-profession">UI/UX Designer</div>
                    <div className="testimonial-description">Discovering Kingston eUniversity was a game-changer for my career as a UI/UX designer. This platform offers an unparalleled learning experience that has helped me elevate my skills to new heights.</div>
                </div>
            </div>
            <br />
            {/* Footer */}
            <footer>
                <a href="#"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
                <a href="#"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
                <a href="#"><FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a>
                <a href="#"><FontAwesomeIcon icon={['fab', 'youtube']} /></a>
                <p>&copy; 2024 Kingston eUniversity. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
