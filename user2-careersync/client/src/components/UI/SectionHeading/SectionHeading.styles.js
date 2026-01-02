import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

export const SectionHeadingContainer = styled(Box)(({ align }) => ({
  textAlign: align || 'center',
  marginBottom: '32px',
}))

export const SectionTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: '36px',
  color: theme.palette.primary.main,
  '@media (max-width: 900px)': {
    fontSize: '28px',
  },
}))

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  margin: '8px 0 0',
  color: theme.palette.text.secondary,
}))

