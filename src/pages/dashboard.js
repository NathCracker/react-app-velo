/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Dashboard as DashboardIcon,
  Message as ChatBubbleIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Group as GroupIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';
import ApplicantsTab from '../components/ApplicantsTab';
import TeamTab from '../components/TeamTab';
import MessagesTab from '../components/MessagesTab';

const drawerWidth = 240;

const MainContent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  backgroundColor: '#f9fafb',
  minHeight: '100vh',
  padding: theme.spacing(4),
  marginLeft: open ? drawerWidth : 0,
  transition: 'margin-left 0.3s ease',
}));

const tabIcons = [
  <DashboardIcon />,
  <PeopleIcon />,
  <BarChartIcon />,
  <GroupIcon />,
  <ChatBubbleIcon />,
  <SettingsIcon />,
];

const tabLabels = ['Overview', 'Applicants', 'Reports', 'Teams', 'Messages', 'Settings'];

const rows = [
  { id: '#000253', product: 'Salt & Pepper Grinder', date: '2023-01-02', total: '$32.00', status: 'Shipped', payment: 'Visa' },
  { id: '#000254', product: 'Backpack', date: '2023-01-04', total: '$130.00', status: 'Shipped', payment: 'PayPal' },
  { id: '#000255', product: 'Pocket Speaker', date: '2023-01-04', total: '$80.00', status: 'Cancelled', payment: 'Mastercard' },
  { id: '#000256', product: 'Glass Teapot', date: '2023-01-08', total: '$45.00', status: 'Shipped', payment: 'Visa' },
  { id: '#000257', product: 'Unbreakable Water Bottle', date: '2023-01-09', total: '$40.00', status: 'Shipped', payment: 'PayPal' },
];

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [adminName, setAdminName] = useState('');
  const [adminPosition, setAdminPosition] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('adminName');
    const position = localStorage.getItem('adminPosition');
    if (!name || !position) {
      window.location.href = '/admin';
    } else {
      setAdminName(name);
      setAdminPosition(position);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/admin';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#fff',
          color: '#1f2937',
          boxShadow: 2,
        }}
      >
        <Toolbar sx={{ display: 'flex', gap: 2 }}>
          <IconButton onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f3f4f6',
                px: 2,
                py: 0.8,
                borderRadius: 2,
                maxWidth: 300,
              }}
            >
              <SearchIcon sx={{ mr: 1, color: 'gray' }} />
              <InputBase placeholder="Search topics..." fullWidth />
            </Box>
          </Box>

          <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>

          <Avatar src="/admin-avatar.png" sx={{ width: 36, height: 36 }} />
        </Toolbar>
      </AppBar>

      {/* Sidebar with animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -drawerWidth }}
            animate={{ x: 0 }}
            exit={{ x: -drawerWidth }}
            transition={{ duration: 0.3 }}
            style={{
              width: drawerWidth,
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              height: '100vh',
              backgroundColor: '#1f2937',
              color: '#fff',
              zIndex: 1200,
              overflow: 'hidden', // ✅ Prevents unwanted scrollbar
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Toolbar />
           <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflowY: 'auto', // 👈 This allows scroll *inside* only when needed
                paddingBottom: 2, // Optional: prevent content from touching the bottom edge
              }}
            >
              <List>
                {tabLabels.map((label, index) => (
                  <ListItem key={label} disablePadding>
                    <ListItemButton
                      selected={selectedTab === index}
                      onClick={() => setSelectedTab(index)}
                      sx={{
                        '&.Mui-selected': {
                          backgroundColor: '#2563eb',
                          '&:hover': { backgroundColor: '#1d4ed8' },
                        },
                        '&:hover': { backgroundColor: '#374151' },
                        borderRadius: 1,
                        mx: 1,
                        my: 0.5,
                      }}
                    >
                      <ListItemIcon sx={{ color: '#fff' }}>{tabIcons[index]}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography fontWeight={500} fontSize="0.95rem">
                            {label}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ flexGrow: 1 }} />
              <Divider sx={{ borderColor: '#4b5563' }} />
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Avatar src="/admin-avatar.png" sx={{ width: 64, height: 64, mx: 'auto', mb: 1 }} />
                <Typography fontWeight={600}>{adminName || 'Admin'}</Typography>
                <Typography variant="body2" color="gray">
                  {adminPosition || 'Administrator'}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <MainContent open={open}>
        <Toolbar />
        <Typography variant="h5" fontWeight={600} mb={2}>
          {tabLabels[selectedTab]}
        </Typography>

        <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
          {selectedTab === 1 ? (
            <ApplicantsTab />
          ) : selectedTab === 3 ? (
            <TeamTab />
          ) : selectedTab === 4 ? (
            <MessagesTab />
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.product}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.total}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          size="small"
                          color={row.status === 'Shipped' ? 'success' : 'error'}
                        />
                      </TableCell>
                      <TableCell>{row.payment}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Download">
                          <IconButton>
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="View">
                          <IconButton>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

      </MainContent>
    </Box>
  );
};

export default Dashboard;
