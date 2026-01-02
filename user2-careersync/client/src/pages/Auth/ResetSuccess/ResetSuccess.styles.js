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

export const SuccessIcon = styled(Box)({
  height: 52,
  width: 52,
  borderRadius: '50%',
  background: '#d1fae5',
  color: '#0f9d58',
  display: 'grid',
  placeItems: 'center',
  margin: '0 auto 10px',
  fontSize: 26,
})

