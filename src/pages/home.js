import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import ScheduleIcon from '@mui/icons-material/Schedule';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SecurityIcon from '@mui/icons-material/Security';
import PageTransition from '../components/PageTransition';

// Hero section (Red gradient with modern photo)
const HeroSection = styled(Box)({
  backgroundImage:
    'linear-gradient(to bottom right, rgba(75, 75, 75, 0.8), rgba(0, 0, 0, 0.9)), url("https://images.pexels.com/photos/7109063/pexels-photo-7109063.jpeg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '47vh',
  color: '#fff',
  padding: '6rem 1rem',
  textAlign: 'center',
});

// Card wrapper: single column layout
const CardWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '50px',
});

// Feature card styled like About page
const FeatureCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '900px',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
  },
}));

const IconWrapper = styled(Box)({
  fontSize: 48,
  color: '#D32F2F', // Matches hero red
  marginBottom: '1rem',
});

const Home = () => {
  return (
    <>
      <PageTransition>
        <HeroSection>
          <Container maxWidth="md">
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Welcome to Velociraptor Technologies
            </Typography>
            <Typography variant="h6" paragraph sx={{ maxWidth: 600, margin: '0 auto' }}>
              Smart. Fast. Reliable. Your appointment system just got better.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                backgroundColor: '#D32F2F',
                '&:hover': {
                  backgroundColor: '#B71C1C',
                },
              }}
              href="/apply"
            >
              Get Started
            </Button>
          </Container>
        </HeroSection>

        {/* Features Section */}
        <Box sx={{ py: 8, backgroundColor: '#f9f9f9' }}>
          <Container maxWidth="lg">
            <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
              Why Choose Us?
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
            >
              We provide a seamless booking experience that's secure, efficient, and user-friendly.
            </Typography>

            <CardWrapper>
              <FeatureCard elevation={3}>
                <IconWrapper>
                  <ScheduleIcon fontSize="inherit" />
                </IconWrapper>
                <Typography variant="h6" gutterBottom>
                  Easy Scheduling
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Schedule appointments in just a few clicks with our intuitive interface.
                </Typography>
              </FeatureCard>

              <FeatureCard elevation={3}>
                <IconWrapper>
                  <NotificationsActiveIcon fontSize="inherit" />
                </IconWrapper>
                <Typography variant="h6" gutterBottom>
                  Real-time Updates
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Stay informed with instant notifications and live updates.
                </Typography>
              </FeatureCard>

              <FeatureCard elevation={3}>
                <IconWrapper>
                  <SecurityIcon fontSize="inherit" />
                </IconWrapper>
                <Typography variant="h6" gutterBottom>
                  Secure & Reliable
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Your data is protected by enterprise-level encryption and safeguards.
                </Typography>
              </FeatureCard>
            </CardWrapper>
          </Container>
        </Box>
      </PageTransition>
    </>
  );
};

export default Home;
