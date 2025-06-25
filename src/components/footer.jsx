import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Link,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#2C2C2C', // Neutral dark gray
  color: '#fff',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  marginTop: theme.spacing(10),
}));

const FooterLink = styled(Link)({
  color: '#cccccc',
  textDecoration: 'none',
  fontSize: '0.9rem',
  display: 'block',
  marginBottom: 6,
  '&:hover': {
    color: '#ffffff',
    textDecoration: 'underline',
  },
});

const Footer = () => {
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* 1: Company Description */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Velociraptor Technologies
            </Typography>
            <Typography variant="body2" color="#cccccc">
              Smart. Fast. Reliable. Simplifying your appointment needs.
            </Typography>
          </Grid>

          {/* 2: Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Quick Links
            </Typography>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/apply">Apply</FooterLink>
            <FooterLink href="/admin">Admin Login</FooterLink>
          </Grid>

          {/* 3 & 4 Combined: Contact + Newsletter + Social */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {/* Contact Info */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Contact Us
                </Typography>
                <Typography variant="body2" color="#cccccc">
                  📍 No. 11 7th Street, Brgy. Sto. Nino<br />
                  Marikina City, PH 1000
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }} color="#cccccc">
                  📞 (02) 1234-5678
                </Typography>
                <Typography variant="body2" color="#cccccc">
                  📧 contact@velociraptortech.com
                </Typography>
              </Grid>

              {/* Newsletter & Social */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Stay Connected
                </Typography>
                <Box>
                  <IconButton href="#" sx={{ color: '#ffffff' }}><FacebookIcon /></IconButton>
                  <IconButton href="#" sx={{ color: '#ffffff' }}><TwitterIcon /></IconButton>
                  <IconButton href="#" sx={{ color: '#ffffff' }}><LinkedInIcon /></IconButton>
                  <IconButton href="#" sx={{ color: '#ffffff' }}><InstagramIcon /></IconButton>
                </Box>
                <Box mt={2}>
                  <TextField
                    variant="filled"
                    size="small"
                    label="Email address"
                    fullWidth
                    sx={{
                      backgroundColor: '#ffffff',
                      borderRadius: 1,
                      input: { padding: '10px' },
                    }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1,
                      backgroundColor: '#D32F2F',
                      '&:hover': {
                        backgroundColor: '#B71C1C',
                      },
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.2)' }} />

        <Typography variant="body2" align="center" color="rgba(255,255,255,0.7)">
          © {new Date().getFullYear()} Velociraptor Technologies OPC. All rights reserved.
        </Typography>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
