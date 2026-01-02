import { styled } from '@mui/material/styles'
import { Box, Container } from '@mui/material'

export const Section = styled(Box)({
  padding: '72px 0',
  '@media (max-width: 900px)': {
    padding: '48px 0',
  },
})

export const FilterRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  justifyContent: 'center',
  marginBottom: '24px',
})

export const FilterChip = styled(Box)(({ theme, active }) => ({
  borderRadius: 10,
  border: `1px solid ${theme.palette.grey[200]}`,
  padding: '10px 14px',
  background: active ? '#d9ebff' : theme.palette.background.default,
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  cursor: 'pointer',
  fontWeight: 600,
  borderColor: active ? '#b9d7ff' : theme.palette.grey[200],
  transition: 'all 0.2s',
  '&:hover': {
    background: active ? '#d9ebff' : '#e5e7eb',
  },
}))

export const ProgramGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '16px',
})

export const ProgramCardContent = styled(Box)({
  display: 'grid',
  gap: '10px',
})

export const ProgramImage = styled('img')({
  width: '100%',
  height: 200,
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: 8,
  display: 'block',
})

