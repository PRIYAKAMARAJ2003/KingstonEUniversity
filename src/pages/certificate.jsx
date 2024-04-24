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

const Certificate = ({ enrollment }) => (
  <Document>
    <Page size="A4" style={styles.certificateContainer}>
      <Text style={styles.title}>Certificate of Completion</Text>
      <Text style={styles.paragraph}>
        This is to certify that {enrollment.studentName} has successfully completed the course "{enrollment.courseName}".
      </Text>
      <Text style={styles.paragraph}>Professor: {enrollment.professorName}</Text>
      <Text style={styles.paragraph}>Batch: {enrollment.startDate} - {enrollment.endDate}</Text>
    </Page>
  </Document>
);

const CertificateGeneration = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get('https://localhost:7281/api/Enrollments');
        setEnrollments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div>
      <h1>Certificate Generation</h1>
      {loading ? (
        <p>Loading...</p>
      ) : enrollments.length === 0 ? (
        <p>No enrollments found</p>
      ) : (
        <PDFViewer width="1000" height="600">
          <Certificate enrollment={enrollments[0]} /> {/* Render the first enrollment for preview */}
        </PDFViewer>
      )}

      {enrollments.length > 0 && (
        <PDFDownloadLink document={<Certificate enrollment={enrollments[0]} />} fileName="certificate.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : <Button variant="contained">Download Certificate</Button>)}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default CertificateGeneration;
