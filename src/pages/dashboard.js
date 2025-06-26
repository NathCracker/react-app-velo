import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Button,
  Divider,
  Paper,
  Slide
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const drawerWidth = 240;

const MainContent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: open ? drawerWidth : 0,
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const SidebarFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid #ddd',
  textAlign: 'center',
}));

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = ['Overview', 'Applicants', 'Reports', 'Teams', 'Settings'];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/admin';
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1300, backgroundColor: '#D32F2F' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(!open)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome to Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Collapsible Sidebar */}
      <Slide direction="right" in={open} mountOnEnter unmountOnExit>
        <Drawer
          variant="persistent"
          open={open}
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <List>
              {tabs.map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    selected={selectedTab === index}
                    onClick={() => setSelectedTab(index)}
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            {/* User Info */}
            <SidebarFooter>
              <Avatar src="/admin-avatar.png" sx={{ width: 64, height: 64, mx: 'auto', mb: 1 }} />
              <Typography variant="subtitle1">Admin Name</Typography>
              <Typography variant="body2" color="text.secondary">
                System Administrator
              </Typography>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleLogout}
                sx={{ mt: 1 }}
              >
                Logout
              </Button>
            </SidebarFooter>
          </Box>
        </Drawer>
      </Slide>

      {/* Main Content */}
      <MainContent open={open}>
        <Toolbar />
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            {tabs[selectedTab]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is the content area for "{tabs[selectedTab]}". Replace this with your components.
          </Typography>
        </Paper>
      </MainContent>
    </Box>
  );
};

export default Dashboard;
