import { Box, Typography } from '@mui/material'
import Button from '../../../components/UI/Button/Button'
import Logo from '../../../components/UI/Logo/Logo'
import { AuthLayout, AuthCard, SuccessIcon } from './ResetSuccess.styles'

function ResetSuccess() {
  return (
    <AuthLayout>
      <AuthCard>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2.5 }}>
          <Logo style={{ color: '#0f172a' }} />
        </Box>
        <SuccessIcon>✓</SuccessIcon>
        <Typography variant="h3" component="h3">
          Password Reset Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your password has been successfully reset. You can now sign in with your new password.
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <Button to="/signin" full>
            Go to Sign In
          </Button>
        </Box>
      </AuthCard>
    </AuthLayout>
  )
}

export default ResetSuccess

