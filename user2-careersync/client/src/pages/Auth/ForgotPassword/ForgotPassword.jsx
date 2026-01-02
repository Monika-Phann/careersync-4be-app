import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Alert } from '@mui/material'
import Button from '../../../components/UI/Button/Button'
import Logo from '../../../components/UI/Logo/Logo'
import FormInput from '../../../components/UI/FormInput/FormInput'
import { AuthLayout, AuthCard, AuthForm } from './ForgotPassword.styles'
import { requestPasswordReset } from '../../../services/authService'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [emailError, setEmailError] = useState('')

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (emailError) setEmailError('')
    if (error) setError('')
  }

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!validateEmail()) {
      return
    }

    setLoading(true)

    try {
      // Normalize email to lowercase for case-insensitive matching
      const result = await requestPasswordReset(email.toLowerCase().trim())

      if (result.success) {
        setSuccess(true)
        setEmail('')
      } else {
        setError(result.message || 'Failed to send reset link. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2.5 }}>
          <Logo style={{ color: '#0f172a' }} />
        </Box>
        <Typography variant="h3" component="h3">
          Forgot Password?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter your email address and we'll send you a link to reset your password.
        </Typography>
        <AuthForm onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Password reset link has been sent to your email. Please check your inbox.
            </Alert>
          )}
          <FormInput
            label="Email Address *"
            type="email"
            placeholder="Enter your email"
            icon="email"
            value={email}
            onChange={handleChange}
            error={!!emailError}
            helperText={emailError}
            disabled={loading || success}
          />
          <Button full type="submit" disabled={loading || success}>
            {loading ? 'Sending...' : success ? 'Link Sent!' : 'Send Reset Link'}
          </Button>
        </AuthForm>
        <Link
          to="/signin"
          style={{ marginTop: 12, display: 'inline-block', color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}
        >
          Back to Sign In
        </Link>
      </AuthCard>
    </AuthLayout>
  )
}

export default ForgotPassword

