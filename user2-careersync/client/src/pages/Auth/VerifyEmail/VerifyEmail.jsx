import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material'
import { AuthLayout, AuthCard } from '../AuthSignIn/AuthSignIn.styles'
import axiosInstance from '../../../api/axiosInstance'
import Logo from '../../../components/UI/Logo/Logo'

function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token')
      const role = searchParams.get('role') || 'user'

      if (!token) {
        setError('Verification token is missing')
        setLoading(false)
        return
      }

      try {
        const response = await axiosInstance.get(`/api/auth/verify/${token}`)
        setSuccess(true)
        setLoading(false)
        
        // Redirect based on role after 3 seconds
        setTimeout(() => {
          if (role === 'mentor') {
            navigate('/mentor-login')
          } else {
            navigate('/signin')
          }
        }, 3000)
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Email verification failed')
        setLoading(false)
      }
    }

    verifyEmail()
  }, [searchParams, navigate])

  return (
    <AuthLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Logo />
        <AuthCard>
          {loading && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="body1">Verifying your email...</Typography>
            </Box>
          )}

          {success && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Email Verified Successfully! ✅
                </Typography>
                <Typography variant="body2">
                  Your email has been verified. You can now log in to your account.
                </Typography>
              </Alert>
              <Button
                variant="contained"
                onClick={() => navigate('/signin')}
                sx={{ mt: 2 }}
              >
                Go to Login
              </Button>
            </Box>
          )}

          {error && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Alert severity="error" sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Verification Failed
                </Typography>
                <Typography variant="body2">{error}</Typography>
              </Alert>
              <Button
                variant="outlined"
                onClick={() => navigate('/signin')}
                sx={{ mt: 2 }}
              >
                Go to Login
              </Button>
            </Box>
          )}
        </AuthCard>
      </Box>
    </AuthLayout>
  )
}

export default VerifyEmail

