import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { Box, Typography, CircularProgress, Button } from '@mui/material';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setStatus('error');
        return;
      }
      try {
        await axiosInstance.get(`/auth/verify-email?token=${token}`);
        setStatus('success');
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus('error');
      }
    };
    verifyToken();
  }, [searchParams]);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      {status === 'verifying' && <CircularProgress />}
      {status === 'success' && (
        <>
          <Typography variant="h5" color="success.main">Email Verified!</Typography>
          <Button variant="contained" onClick={() => navigate('/login')}>Go to Login</Button>
        </>
      )}
      {status === 'error' && (
        <>
          <Typography variant="h5" color="error">Verification Failed</Typography>
          <Button variant="outlined" onClick={() => navigate('/login')}>Back to Login</Button>
        </>
      )}
    </Box>
  );
};

export default VerifyEmail;
