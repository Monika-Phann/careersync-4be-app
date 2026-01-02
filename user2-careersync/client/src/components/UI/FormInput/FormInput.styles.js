import { styled } from '@mui/material/styles'
import { TextField, Box } from '@mui/material'

export const InputGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  width: '100%',
})

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    height: 52,
    display: 'flex',
    alignItems: 'center',
    paddingRight: 6,
    '& input': {
      padding: '14px 0 14px 4px',
    },
    '& fieldset': {
      borderColor: '#cfd4dc',
    },
    '&:hover fieldset': {
      borderColor: '#bcc3cc',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0c3c82',
      boxShadow: '0 0 0 2px rgba(12, 60, 130, 0.12)',
    },
    '&.Mui-error fieldset': {
      borderColor: '#ef4444',
    },
    '&.Mui-error.Mui-focused fieldset': {
      borderColor: '#ef4444',
      boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.12)',
    },
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
  },
  '& .MuiInputLabel-root': {
    fontWeight: 600,
    color: '#6b7280',
    fontSize: 14,
    '&.Mui-error': {
      color: '#ef4444',
    },
  },
  '& .MuiInputAdornment-root': {
    color: '#6b7280',
  },
  '& .MuiFormHelperText-root': {
    marginLeft: 0,
    marginTop: 4,
    fontSize: '12px',
  },
}))

