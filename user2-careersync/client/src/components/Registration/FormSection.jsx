import { Box, Typography, Divider } from '@mui/material'

function FormSection({ title, children, centerTitle = false, withTopDivider = false, sx = {} }) {
  return (
    <Box sx={{ ...sx }}>
      {title && (
        <Box sx={{ textAlign: centerTitle ? 'center' : 'left', mb: 1.5 }}>
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>
            {title}
          </Typography>
        </Box>
      )}
      {withTopDivider && <Divider sx={{ mb: 2 }} />}
      {children}
    </Box>
  )
}

export default FormSection
