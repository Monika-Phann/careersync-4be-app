import { styled } from '@mui/material/styles'
import { Box, Card } from '@mui/material'

export const AuthLayout = styled(Box)({
  display: 'grid',
  placeItems: 'center',
  padding: '60px 0',
})

export const AuthCard = styled(Card)({
  width: 'min(440px, 100%)',
  borderRadius: 16,
  padding: '26px',
  textAlign: 'center',
})

export const AuthForm = styled('form')({
  display: 'grid',
  gap: '12px',
  marginTop: '16px',
})

