import { styled } from '@mui/material/styles'
import { Box, Container } from '@mui/material'

export const Section = styled(Box)({
  padding: '72px 0',
  '@media (max-width: 900px)': {
    padding: '48px 0',
  },
})

export const AboutLead = styled(Box)({
  maxWidth: 880,
  margin: '0 auto 56px',
  textAlign: 'center',
})

export const TeamGrid = styled(Box)({
  display: 'grid',
  // Creates a nice responsive grid (4 columns on desktop, 2 on tablet, 1 on mobile)
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '32px',
  marginBottom: '64px',
})

export const TeamCardContent = styled(Box)({
  textAlign: 'center',
  padding: '16px 0',
})

export const TeamMemberImage = styled('img')({
  width: '100%',
  height: '280px', // Taller height for professional portraits
  objectFit: 'cover',
  objectPosition: 'top center', // Focus on faces
  borderRadius: 12,
  marginBottom: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
})

export const BioGrid = styled(Box)({
  display: 'grid',
  gap: '24px',
  marginTop: 30,
})

export const BioCard = styled(Box)(({ theme, white }) => ({
  display: 'flex', // Changed to flex for better layout
  gap: '32px',
  alignItems: 'flex-start',
  background: white ? '#fff' : '#F8FAFC',
  padding: '32px',
  borderRadius: 24,
  border: `1px solid ${white ? theme.palette.grey[200] : '#E2E8F0'}`,
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
}))

export const BioImage = styled('img')({
  width: 140,
  height: 140,
  flexShrink: 0,
  objectFit: 'cover',
  borderRadius: '50%', // Circular image for bio section looks very modern
  border: '4px solid #fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
})
