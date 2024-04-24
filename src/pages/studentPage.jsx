import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher, faUserPlus ,faGraduationCap, faUsers,faLaptopCode, faDatabase, faChartBar} from '@fortawesome/free-solid-svg-icons';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, makeStyles } from '@material-ui/core';

import backgroundImg from '../image/background.jpg'; // Import the image file

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      background: 'transparent',
      boxShadow: 'none',
      backgroundColor: '#20c997',
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
      color: '#fff', // Text color
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: '#fff', // Text color
    },
    background: {
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(4),
      color: '#fff', // Text color
      textAlign: 'center',
    },
    box: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        transition: 'background-color 0.3s',
        position: 'relative',
        overflow: 'hidden', // Ensure the position:absolute of icon doesn't overflow
        '&:hover': {
          backgroundColor: '#20c997', // Change the background color on hover
        },
      },
      icon: {
        position: 'absolute',
        top: '10px', // Adjust top position as needed
        right: '10px', // Adjust right position as needed
      },
  }));
  
const StudentPage = () => {
  const classes = useStyles();
  const [anchorSignIn, setAnchorSignIn] = React.useState(null);
  const [anchorSignUp, setAnchorSignUp] = React.useState(null);

  const handleSignInClick = (event) => {
    setAnchorSignIn(event.currentTarget);
  };

  const handleSignInClose = () => {
    setAnchorSignIn(null);
  };

  const handleSignUpClick = (event) => {
    setAnchorSignUp(event.currentTarget);
  };

  const handleSignUpClose = () => {
    setAnchorSignUp(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Kingston eUniversity
          </Typography>
          <div>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit">About Us</Button>
            {/* <Button color="inherit" onClick={handleSignInClick}>Course</Button> */}
            <Menu
              id="signIn-menu"
              anchorEl={anchorSignIn}
              keepMounted
              open={Boolean(anchorSignIn)}
              onClose={handleSignInClose}
            >
              <MenuItem component={Link} to="/approvedCoursePage" onClick={handleSignInClose}>Course</MenuItem>

            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.background}>
        <Typography variant="h2" gutterBottom>Welcome to My Website!</Typography>
        <Typography variant="body1">This is the home page.</Typography>
      </div>
      <br />
            <h2 id="about-us" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>"Unlock Your Potential, Ignite Your Future"</h2>
            <div className="quote" style={{marginLeft: '300px'}}>
                <p>"Every student can learn, just not on the same day, or the same way." - George Evans </p>
            </div>
            <div className="about-container" style={{ display: 'flex', marginLeft:'155px' }}>
                <div className="content-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <div className={classes.box}>
                        <h3>Available Courses</h3>
                        <MenuItem component={Link} to="/approvedCoursePage" onClick={handleSignInClose}>Courses Designed for Lifelong Learning</MenuItem>
                        <FontAwesomeIcon icon={faLaptopCode} className={classes.icon} /> {/* Font Awesome icon */}
                    </div>
                    <div className={classes.box}>
                        <h3>Enrolled Courses</h3>
                        <MenuItem component={Link} to="/approvedEnrollmentPage" onClick={handleSignInClose}>Courses Designed for Lifelong Learning</MenuItem>
                        <FontAwesomeIcon icon={faChalkboardTeacher} className={classes.icon} /> {/* Font Awesome icon */}
                    </div>
                    <div className={classes.box}>
                        <h3>View Lessons</h3>
                        <MenuItem component={Link} to="/lessonDetailsPage" onClick={handleSignInClose}>Trimming the Edges: Deleting to Define Excellence</MenuItem>
                        <FontAwesomeIcon icon={faUsers} className={classes.icon} /> 
                    </div>
                    {/* <div className={classes.box}>
                        <h3>Create Lesson</h3>
                        <MenuItem component={Link} to="/lessonPage" onClick={handleSignInClose}>Crafting Lessons: Where Knowledge Begins to Blossom</MenuItem>
                        <FontAwesomeIcon icon={faLaptopCode} className={classes.icon} /> 
                    </div> */}
                </div>
            </div>
    </div>
  );
};
export default StudentPage;
