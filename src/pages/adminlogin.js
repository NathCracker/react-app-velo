import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const LoginWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f9f9f9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  maxWidth: 420,
  width: '100%',
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
}));

const Logo = styled('img')({
  width: 320,
  height: 80,
  marginBottom: 16,
});

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <LoginWrapper>
      <LoginCard elevation={4}>
        {/* Logo on top */}
        <Logo src="/logo.png" alt="Logo" />

        <Typography variant="h5" fontWeight={700} gutterBottom>
          Admin Login
        </Typography>

        <Typography variant="body2" sx={{ color: '#777', mb: 2 }}>
          Authorized access only
        </Typography>

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: '#D32F2F',
              '&:hover': {
                backgroundColor: '#B71C1C',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </LoginCard>
    </LoginWrapper>
  );
};

export default AdminLogin;
