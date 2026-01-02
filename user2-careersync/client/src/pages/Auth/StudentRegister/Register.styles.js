import { styled } from '@mui/material/styles'
import { Box, Container, Card } from '@mui/material'

export const Section = styled(Box)({
  padding: '72px 0',
  '@media (max-width: 900px)': {
    padding: '48px 0',
  },
})

export const RegisterLayout = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '400px 1fr',
  gap: '24px',
  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
})

export const FormBox = styled(Card)({
  padding: '22px',
})

export const ProfileUploadContainer = styled(Box)({
  position: 'relative',
  display: 'inline-block',
  margin: '0 auto 14px',
})

export const ProfileIcon = styled(Box)({
  height: 140,
  width: 140,
  borderRadius: '50%',
  background: '#f5f7fb',
  display: 'grid',
  placeItems: 'center',
  fontSize: 48,
  color: '#9ca3af',
  border: '2px solid #e5e7eb',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    background: '#e5e7eb',
  },
})

export const UploadIconButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  height: 40,
  width: 40,
  borderRadius: '50%',
  background: theme.palette.primary.main,
  display: 'grid',
  placeItems: 'center',
  color: '#fff',
  cursor: 'pointer',
  border: '3px solid #fff',
  fontSize: '20px',
  boxShadow: theme.shadows[2],
  '&:hover': {
    background: theme.palette.primary.dark,
    transform: 'scale(1.05)',
  },
}))

export const AuthForm = styled(Box)({
  display: 'grid',
  gap: '18px',
  marginTop: '18px',
})

export const FormRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '18px',
  marginBottom: '20px',
  alignItems: 'stretch',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

export const FormFieldWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  width: '100%',
  justifyContent: 'flex-start',
  height: '100%',
})

export const UploadBox = styled(Box)(({ theme }) => ({
  border: '1px solid #cfd4dc',
  padding: '12px 14px',
  borderRadius: 12,
  background: '#e5e7eb',
  textAlign: 'left',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '10px',
  minHeight: '52px',
  height: '100%',
  color: '#4b5563',
  transition: 'all 0.2s',
  svg: {
    fontSize: '18px',
    color: '#6b7280',
  },
  '&:hover': {
    borderColor: theme.palette.primary.main,
    background: '#e0e7ff',
  },
}))

export const CheckboxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  border: `1px solid #0c3c82`,
  padding: '12px 14px',
  borderRadius: 10,
  background: '#f8fafc',
  margin: '22px 0',
}))

export const WarningBox = styled(Box)({
  background: '#fff6d5',
  border: '1px solid #facc15',
  padding: '10px',
  borderRadius: 12,
  marginBottom: 12,
})

export const GenderRow = styled(Box)({
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: '18px',
})

