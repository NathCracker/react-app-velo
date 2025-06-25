import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PageTransition from '../components/PageTransition';

const Hero = styled(Box)(({ theme }) => ({
  backgroundImage:
    'linear-gradient(to right, rgba(21, 101, 192, 0.8), rgba(21, 101, 192, 0.9)), url("https://images.pexels.com/photos/7988667/pexels-photo-7988667.jpeg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  color: '#fff',
  minHeight: '80vh', // Increased height
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(6),
}));


const InfoCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  marginTop: '50px',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',

  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: 50,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const About = () => {
  return (
    <>
      <PageTransition>
      <Hero>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom fontWeight={700}>
            About Velociraptor Technologies
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 700, margin: '0 auto' }}>
            Transforming the way appointments are scheduled, managed, and delivered — with speed, intelligence, and simplicity.
          </Typography>
        </Container>
      </Hero>



      {/* Info Cards */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <InfoCard>
          <IconWrapper>
            <PeopleAltIcon fontSize="inherit" />
          </IconWrapper>
          <Typography variant="h5" gutterBottom>
            Who We Are
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Velociraptor Technologies is a forward-thinking software company focused on building powerful, user-friendly appointment systems. We streamline scheduling for businesses and customers with cutting-edge technology.
          </Typography>
        </InfoCard>

        <InfoCard>
          <IconWrapper>
            <FlagIcon fontSize="inherit" />
          </IconWrapper>
          <Typography variant="h6" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body2" color="text.secondary">
            To simplify appointment management through smart automation, intuitive design, and real-time insights — helping organizations save time and elevate service.
          </Typography>
        </InfoCard>

        <InfoCard>
          <IconWrapper>
            <VisibilityIcon fontSize="inherit" />
          </IconWrapper>
          <Typography variant="h6" gutterBottom>
            Our Vision
          </Typography>
          <Typography variant="body2" color="text.secondary">
            To become the global leader in appointment technologies, delivering excellence through innovation, security, and user-first experiences.
          </Typography>
        </InfoCard>
      </Container>
      </PageTransition>
    </>
  );
};

export default About;
