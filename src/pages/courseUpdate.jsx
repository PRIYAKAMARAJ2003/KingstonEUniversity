import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateCourse = ({ id }) => {
    const [course, setCourse] = useState({
        batch: '',
        courseName: '',
        description: '',
        price: '',
        duration: ''
    });

    const [oldCourse, setOldCourse] = useState({});
    const [updatedCourse, setUpdatedCourse] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch the existing course data
        axios.get(`https://localhost:7281/api/Courses/${id}`)
            .then(response => {
                setCourse(response.data);
                setOldCourse(response.data);
            })
            .catch(error => console.log(error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://localhost:7281/api/Courses/${id}`, course)
            .then(response => {
                setUpdatedCourse(response.data);
                setMessage('Course updated successfully!');
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="batch">Batch:</label>
                    <input type="text" id="batch" name="batch" value={course.batch} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="courseName">Course Name:</label>
                    <input type="text" id="courseName" name="courseName" value={course.courseName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={course.description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" value={course.price} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="duration">Duration:</label>
                    <input type="text" id="duration" name="duration" value={course.duration} onChange={handleChange} />
                </div>
                <button type="submit">Update Course</button>
            </form>
            <p>{message}</p>

            <h2>Old Course Details</h2>
            <p>Batch: {oldCourse.batch}</p>
            <p>Course Name: {oldCourse.courseName}</p>
            <p>Description: {oldCourse.description}</p>
            <p>Price: {oldCourse.price}</p>
            <p>Duration: {oldCourse.duration}</p>

            <h2>Updated Course Details</h2>
            <p>Batch: {updatedCourse.batch}</p>
            <p>Course Name: {updatedCourse.courseName}</p>
            <p>Description: {updatedCourse.description}</p>
            <p>Price: {updatedCourse.price}</p>
            <p>Duration: {updatedCourse.duration}</p>
        </div>
    );
};

export default UpdateCourse;
