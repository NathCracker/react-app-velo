import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

const pages = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Apply', path: '/apply' },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="fixed" elevation={4} sx={{ backgroundColor: '#FFFFFF', color: '#000' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.png"
              alt="Company Logo"
              style={{ height: '50px', marginRight: '10px' }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontWeight: 700,
                color: '#000',
              }}
            >
              
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {pages.map(({ label, path }) => (
              <Button
                key={label}
                component={NavLink}
                to={path}
                sx={{
                  color: '#000',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.1)', // light red
                  },
                  '&.active': {
                    backgroundColor: 'rgba(211, 47, 47, 0.15)',
                    borderBottom: '2px solid #D32F2F',
                    fontWeight: 'bold',
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* Mobile Sidebar Toggle Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer to push content below fixed navbar */}
      <Toolbar />

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {pages.map(({ label, path }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={path}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(211, 47, 47, 0.08)',
                    },
                    '&.active': {
                      backgroundColor: 'rgba(211, 47, 47, 0.15)',
                    },
                  }}
                >
                  <ListItemText
                    primary={label}
                    sx={{
                      '.active &': {
                        fontWeight: 'bold',
                        color: '#D32F2F',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

    </>
  );
};

export default Navbar;
