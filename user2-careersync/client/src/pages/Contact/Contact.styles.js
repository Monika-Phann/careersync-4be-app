import { styled } from '@mui/material/styles'
import { Box, Container } from '@mui/material'

export const Section = styled(Box)({
  padding: '72px 0',
  '@media (max-width: 900px)': {
    padding: '48px 0',
  },
})

export const ContactGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '18px',
  alignItems: 'start',
})

export const MapIframe = styled('iframe')({
  width: '100%',
  border: 0,
  borderRadius: 16,
  minHeight: 320,
})

