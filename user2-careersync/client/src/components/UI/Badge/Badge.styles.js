import { styled } from '@mui/material/styles'
import { Chip } from '@mui/material'

export const StyledBadge = styled(Chip)(({ theme }) => ({
  height: 'auto',
  padding: '6px 12px',
  borderRadius: '999px',
  background: theme.palette.secondary.light,
  color: theme.palette.secondary.main,
  fontWeight: 600,
  fontSize: '13px',
  border: 'none',
  '& .MuiChip-label': {
    padding: 0,
  },
}))

