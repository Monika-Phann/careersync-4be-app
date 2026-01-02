import { styled } from '@mui/material/styles'
import { Box, Container } from '@mui/material'

export const StyledFooter = styled('footer')(({ theme }) => ({
  background: theme.palette.primary.main,
  color: '#dce7ff',
  padding: '44px 0 28px',
}))

export const FooterContainer = styled(Container)({
  maxWidth: 1200,
})

export const FooterGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr 1fr',
  gap: '18px',
  '@media (max-width: 900px)': {
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  },
})

export const FooterSection = styled(Box)({
  '& h4': {
    margin: '0 0 10px',
    color: '#fff',
  },
  '& p': {
    margin: '6px 0',
    color: '#b9c8e6',
  },
})

export const SocialRow = styled(Box)({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
})

export const SocialButton = styled(Box)(({ theme }) => ({
  height: 36,
  width: 36,
  borderRadius: 10,
  background: theme.palette.primary.light,
  display: 'grid',
  placeItems: 'center',
  color: '#fff',
  cursor: 'pointer',
  transition: 'background 0.2s',
  '&:hover': {
    background: '#1e3a5f',
  },
}))

export const FooterNote = styled('p')({
  marginTop: 24,
  color: '#9fb4d7',
  textAlign: 'center',
})

