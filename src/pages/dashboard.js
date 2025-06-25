import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Tabs,
  Tab,
  Box,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';

// --- Styled Components ---
const ProfileCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
}));

const AvatarLarge = styled(Avatar)(({ theme }) => ({
  width: 90,
  height: 90,
  marginRight: theme.spacing(3),
}));

const TabPanel = ({ value, index, children }) => (
  <div hidden={value !== index}>
    {value === index && <Box pt={2}>{children}</Box>}
  </div>
);

// --- Dashboard Component ---
const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/admin';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome to the Admin Dashboard
      </Typography>

      {/* Profile Card */}
      <ProfileCard>
        <AvatarLarge src="/admin-avatar.jpg" alt="Admin" />
        <CardContent>
          <Typography variant="h6">Juan Velociraptor</Typography>
          <Typography variant="body2" color="text.secondary">
            System Administrator
          </Typography>
        </CardContent>
      </ProfileCard>

      {/* Tabs */}
      <Paper sx={{ mt: 4, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Overview" />
          <Tab label="Applicants" />
          <Tab label="Reports" />
          <Tab label="Settings" />
        </Tabs>

        {/* Tab Content */}
        <Box p={3}>
          <TabPanel value={tabValue} index={0}>
            <Typography>Admin Overview content goes here.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Typography>List of applicants will be displayed here.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Typography>Reports and analytics appear here.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <Typography>System settings and preferences.</Typography>
          </TabPanel>
        </Box>
      </Paper>

      {/* Logout */}
      <Box sx={{ textAlign: 'right', mt: 4 }}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
