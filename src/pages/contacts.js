import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PageTransition from '../components/PageTransition';

const Header = styled(Box)(({ theme }) => ({
  backgroundImage:
    'linear-gradient(to right, rgba(75, 75, 75, 0.8), rgba(0, 0, 0, 0.9)), url("https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',
  padding: theme.spacing(8, 2),
  textAlign: 'center',
  alignItems: 'center',
  minHeight: '30vh'
}));

const FormSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  height: '100%',
}));

// Updated icon + text layout
const IconText = ({ icon: Icon, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
    <Icon sx={{ mr: 1, color: '#D32F2F' }} />
    <Typography variant="body1" whiteSpace="pre-line">{text}</Typography>
  </Box>
);

const Contact = () => {
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.name) newErrors.name = 'Name is required';
    if (!formValues.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) newErrors.email = 'Invalid email';
    if (!formValues.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setOpenSnackbar(true);
      setFormValues({ name: '', email: '', message: '' });
    }
  };

  return (
    <>
      <PageTransition>
        <Header>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 700, mx: 'auto' }}>
            We're here to help. Reach out to us with any questions or concerns.
          </Typography>
        </Header>

        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
            {/* Left: Form */}
            <Grid item xs={12} md={6}>
              <FormSection>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Send a Message
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box component="form" noValidate onSubmit={handleSubmit}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formValues.message}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 2,
                      backgroundColor: '#D32F2F',
                      '&:hover': {
                        backgroundColor: '#B71C1C',
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </FormSection>
            </Grid>

            {/* Right: Contact Info */}
            <Grid item xs={12} md={5}>
              <FormSection sx={{ mt: { xs: 2, md: 0 } }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Contact Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <IconText
                  icon={LocationOnIcon}
                  text={`Velociraptor Technologies OPC\nNo. 11 7th Street, Brgy. Sto. Niño\nMarikina City, PH 1000`}
                />
                <IconText icon={PhoneIcon} text="(02) 1234-5678" />
                <IconText icon={EmailIcon} text="contact@velociraptortech.com" />
              </FormSection>
            </Grid>
          </Grid>
        </Container>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            Message submitted successfully!
          </Alert>
        </Snackbar>
      </PageTransition>
    </>
  );
};

export default Contact;
