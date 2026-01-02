import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams, useParams } from 'react-router-dom'
import { Box, Typography, Alert } from '@mui/material'
import Button from '../../../components/UI/Button/Button'
import Logo from '../../../components/UI/Logo/Logo'
import FormInput from '../../../components/UI/FormInput/FormInput'
import { AuthLayout, AuthCard, AuthForm } from './ResetPassword.styles'
import { resetPassword } from '../../../services/authService'

function ResetPassword() {
  const navigate = useNavigate()
  const { resetToken: pathToken } = useParams()
  const [searchParams] = useSearchParams()
  // Support token from URL path or query parameters
  const resetToken = pathToken || searchParams.get('token') || searchParams.get('resetToken')

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    // Check for error query parameter from backend redirect
    const errorParam = searchParams.get('error')
    if (errorParam === 'invalid') {
      setError('Invalid or expired reset token. Please request a new password reset link.')
    } else if (!resetToken) {
      setError('Invalid or missing reset token. Please request a new password reset link.')
    }
  }, [resetToken, searchParams])

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: '' }))
    }
    if (error) setError('')
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!resetToken) {
      setError('Invalid or missing reset token.')
      return
    }

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const result = await resetPassword(resetToken, { password: formData.password })

      if (result.success) {
        // Redirect to success page
        navigate('/reset-success')
      } else {
        setError(result.message || 'Password reset failed. Please try again.')
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
          Reset Your Password
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please enter your new password below.
        </Typography>
        <AuthForm onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <FormInput
            label="New Password *"
            type="password"
            placeholder="Enter new password"
            icon="password"
            value={formData.password}
            onChange={handleChange('password')}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
            disabled={loading || !resetToken}
          />
          <FormInput
            label="Confirm Password *"
            type="password"
            placeholder="Confirm new password"
            icon="password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={!!fieldErrors.confirmPassword}
            helperText={fieldErrors.confirmPassword}
            disabled={loading || !resetToken}
          />
          <Button full type="submit" disabled={loading || !resetToken}>
            {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword

