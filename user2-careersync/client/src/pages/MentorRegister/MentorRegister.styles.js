import { styled } from '@mui/material/styles'
import { Box, Card } from '@mui/material'


export const Section = styled(Box)({
  padding: '48px 0 64px',
  background: '#f8fafc',
})

export const Layout = styled(Box)({
  maxWidth: 1200,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '360px 1fr',
  gap: '24px',
  padding: '0 20px',
  '@media (max-width: 1100px)': {
    gridTemplateColumns: '1fr',
  },
})

export const CardBox = styled(Card)({
  padding: '18px 20px',
  borderRadius: 14,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
})

export const ProfileCircle = styled(Box)({
  height: 140,
  width: 140,
  borderRadius: '50%',
  background: '#e5e7eb',
  display: 'grid',
  placeItems: 'center',
  fontSize: 56,
  color: '#94a3b8',
  margin: '12px auto',
  border: '1px solid #d5d7db',
  overflow: 'hidden',
})

export const UploadHint = styled(Box)({
  textAlign: 'center',
  fontSize: 13,
  color: '#475569',
})

export const WarningBox = styled(Box)({
  background: '#fff6d5',
  border: '1px solid #facc15',
  padding: '12px',
  borderRadius: 12,
  marginBottom: 16,
  fontSize: 13,
})

export const FormCard = styled(Card)({
  padding: '20px 22px 24px',
  borderRadius: 14,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
})

export const InputGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  marginBottom: '16px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

export const TextArea = styled('textarea')({
  width: '100%',
  minHeight: 120,
  borderRadius: 12,
  border: '1px solid #d5d7db',
  padding: '12px 14px',
  fontSize: 14,
  resize: 'vertical',
})

export const CheckboxRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  margin: '14px 0 22px',
})
