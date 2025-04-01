import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Link,
  Alert,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';

const EmailVerification = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      // Here you would typically make an API call to verify the email
      console.log('Verifying email with token:', token);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll just check if the token exists
      if (!token) {
        throw new Error('Invalid verification token');
      }

      setStatus('success');
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Failed to verify email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    setResendSuccess(false);

    try {
      // Here you would typically make an API call to resend the verification email
      console.log('Resending verification email');
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setResendSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to resend verification email. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={60} sx={{ mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Verifying Your Email
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Please wait while we verify your email address...
              </Typography>
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircleIcon
                sx={{ fontSize: 60, color: 'success.main', mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                Email Verified Successfully!
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Your email has been verified. You will be redirected to the login page in a few seconds.
              </Typography>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Go to Login
              </Button>
            </>
          ) : (
            <>
              <ErrorIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Verification Failed
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {error || 'We were unable to verify your email address.'}
              </Typography>
              {resendSuccess ? (
                <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                  Verification email has been resent. Please check your inbox.
                </Alert>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                  sx={{ mt: 2 }}
                >
                  {resendLoading ? 'Sending...' : 'Resend Verification Email'}
                </Button>
              )}
              <Button
                component={RouterLink}
                to="/login"
                variant="text"
                color="primary"
                sx={{ mt: 2 }}
              >
                Back to Login
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default EmailVerification; 