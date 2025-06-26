import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/system';
import PageTransition from '../components/PageTransition';

// Red-toned parallax background
const ParallaxHero = styled(Box)(({ theme }) => ({
  backgroundImage:
    'linear-gradient(to bottom right, rgba(75, 75, 75, 0.8), rgba(0, 0, 0, 0.9)), url("https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  color: '#fff',
  minHeight: '30vh',
  textAlign: 'center',
  alignItems: 'center',
  padding: '6rem 1rem',
  [theme.breakpoints.down('sm')]: {
    backgroundAttachment: 'scroll',
  },
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(6),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
}));

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    contactNumber: '',
    id1: null,
    id2: null,
  });

  const [preview, setPreview] = useState({ id1: '', id2: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      const fileURL = URL.createObjectURL(files[0]);
      setPreview((prev) => ({ ...prev, [name]: fileURL }));
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, address, contactNumber, id1, id2 } = formData;
    if (!fullName || !address || !contactNumber || !id1 || !id2) {
      setError('Please fill in all fields and upload both ID images.');
      return;
    }

    setSubmitted(true);
    setFormData({
      fullName: '',
      address: '',
      contactNumber: '',
      id1: null,
      id2: null,
    });
    setPreview({ id1: '', id2: '' });
  };

  return (
    <>
      <PageTransition>
        <ParallaxHero>
          <Container maxWidth="md">
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Online Application Form
            </Typography>
            <Typography variant="h6">
              Please complete the form and upload two valid government-issued IDs.
            </Typography>
          </Container>
        </ParallaxHero>

        <Container maxWidth="md" sx={{p: 3}}>
          <FormContainer>
            <Typography variant="h5" gutterBottom>
              Applicant Information
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                name="fullName"
                fullWidth
                margin="normal"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <TextField
                label="Address"
                name="address"
                fullWidth
                margin="normal"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <TextField
                label="Contact Number"
                name="contactNumber"
                fullWidth
                margin="normal"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />

              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Upload ID 1
                  </Typography>
                  <Button
                    component="label"
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderColor: '#D32F2F',
                      color: '#D32F2F',
                      '&:hover': {
                        borderColor: '#B71C1C',
                        backgroundColor: 'rgba(211,47,47,0.05)',
                      },
                    }}
                  >
                    Upload ID 1
                    <input type="file" hidden name="id1" accept="image/*" onChange={handleFileChange} />
                  </Button>
                  {preview.id1 && (
                    <Box mt={2}>
                      <img src={preview.id1} alt="ID 1 Preview" style={{ width: '100%', borderRadius: 8 }} />
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Upload ID 2
                  </Typography>
                  <Button
                    component="label"
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderColor: '#D32F2F',
                      color: '#D32F2F',
                      '&:hover': {
                        borderColor: '#B71C1C',
                        backgroundColor: 'rgba(211,47,47,0.05)',
                      },
                    }}
                  >
                    Upload ID 2
                    <input type="file" hidden name="id2" accept="image/*" onChange={handleFileChange} />
                  </Button>
                  {preview.id2 && (
                    <Box mt={2}>
                      <img src={preview.id2} alt="ID 2 Preview" style={{ width: '100%', borderRadius: 8 }} />
                    </Box>
                  )}
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 4,
                  backgroundColor: '#D32F2F',
                  '&:hover': {
                    backgroundColor: '#B71C1C',
                  },
                }}
              >
                Submit Application
              </Button>
            </Box>
          </FormContainer>
        </Container>

        {/* Success Snackbar */}
        <Snackbar open={submitted} autoHideDuration={4000} onClose={() => setSubmitted(false)}>
          <Alert severity="success" onClose={() => setSubmitted(false)}>
            Application submitted successfully!
          </Alert>
        </Snackbar>

        {/* Error Snackbar */}
        <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        </Snackbar>
      </PageTransition>
    </>
  );
};

export default ApplicationForm;
