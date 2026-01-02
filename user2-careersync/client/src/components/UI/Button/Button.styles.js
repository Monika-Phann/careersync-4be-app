import { styled } from '@mui/material/styles'
import { Button as MuiButton } from '@mui/material'

export const StyledButton = styled(MuiButton)(({ theme, variant, fullwidth }) => ({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 10,
  padding: '12px 18px',
  width: fullwidth === 'true' ? '100%' : 'auto',
  ...(variant === 'primary' && {
    background: theme.palette.primary.main,
    color: '#fff',
    boxShadow: theme.shadows[1],
    '&:hover': {
      background: theme.palette.primary.dark,
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows[1],
    },
  }),
  ...(variant === 'secondary' && {
    background: '#C0E6F9',
    color: theme.palette.primary.main,
    boxShadow: 'none',
    '&:hover': {
      background: '#a8dbf7',
    },
  }),
  ...(variant === 'light' && {
    background: '#f1f5f9',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.grey[200]}`,
    boxShadow: 'none',
    '&:hover': {
      background: '#e2e8f0',
    },
  }),
}))

