import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher, faUserPlus ,faGraduationCap, faUsers,faLaptopCode, faDatabase, faChartBar} from '@fortawesome/free-solid-svg-icons';
import backgroundImg from '../image/background.jpg'; // Import the image file

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: '#1976d2', // Change the background color to a contrasting color
    boxShadow: 'none',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  background: {
    backgroundImage: `url(${backgroundImg})`, // Use the imported image
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
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

const ProfessorPage = () => {
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
            E_Learning
          </Typography>
          <div>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit">About Us</Button>
            {/* <Button color="inherit" onClick={handleSignInClick}>Courses</Button>
            <Menu
              id="signIn-menu"
              anchorEl={anchorSignIn}
              keepMounted
              open={Boolean(anchorSignIn)}
              onClose={handleSignInClose}
            >
              <MenuItem component={Link} to="/coursePage" onClick={handleSignInClose}>Course creation</MenuItem>
              <MenuItem component={Link} to="/lessonPage" onClick={handleSignInClose}>Lesson creation</MenuItem>
              <MenuItem component={Link} to="/registrarSignInPage" onClick={handleSignInClose}>Registrar Sign In</MenuItem>
            </Menu> */}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.background}>
        <Typography variant="h2" gutterBottom>Welcome to Kingston eUniversity!</Typography>
        <Typography variant="body1">This is the home page.</Typography>
      </div>

      <br />
            <h2 id="about-us" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>"Empowering Professors, Inspiring Minds: Where Knowledge Meets Innovation!"</h2>
            <div className="quote" style={{marginLeft: '300px'}}>
                <p>"A good teacher can inspire hope, ignite the imagination, and instill a love of learning." - Brad Henry </p>
            </div>
            <div className="about-container" style={{ display: 'flex', marginLeft:'155px' }}>
                <div className="content-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <div className={classes.box}>
                        <h3>Create Courses</h3>
                        <MenuItem component={Link} to="/coursePage" onClick={handleSignInClose}>Cultivate Knowledge, Construct Courses</MenuItem>
                        <FontAwesomeIcon icon={faLaptopCode} className={classes.icon} /> {/* Font Awesome icon */}
                    </div>
                    <div className={classes.box}>
                        <h3>Update Courses</h3>
                        <MenuItem component={Link} to="/updateCourse" onClick={handleSignInClose}>Evolve Learning, Update Courses</MenuItem>
                        <FontAwesomeIcon icon={faChalkboardTeacher} className={classes.icon} /> {/* Font Awesome icon */}
                    </div>
                    <div className={classes.box}>
                        <h3>Delete Courses</h3>
                        <MenuItem component={Link} to="/deleteCoursePage" onClick={handleSignInClose}>Trimming the Edges: Deleting to Define Excellence</MenuItem>
                        <FontAwesomeIcon icon={faUsers} className={classes.icon} /> {/* Font Awesome icon */}
                    </div>
                    <div className={classes.box}>
                        <h3>Create Lesson</h3>
                        <MenuItem component={Link} to="/lessonPage" onClick={handleSignInClose}>Crafting Lessons: Where Knowledge Begins to Blossom</MenuItem>
                        <FontAwesomeIcon icon={faLaptopCode} className={classes.icon} /> {/* Font Awesome icon */}
                    </div>
                </div>
            </div>
    </div>
  );
};

export default ProfessorPage;
