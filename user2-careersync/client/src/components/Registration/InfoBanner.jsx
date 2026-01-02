import { Box, Typography } from '@mui/material'

function InfoBanner({ title, description }) {
  return (
    <Box
      sx={{
        backgroundColor: '#fff6d5',
        border: '1px solid #facc15',
        borderRadius: 1.5,
        px: 2,
        py: 1.5,
      }}
    >
      <Typography component="strong" variant="body2" sx={{ fontWeight: 700, color: '#92400e' }}>
        {title}
      </Typography>{' '}
      <Typography component="span" variant="body2" sx={{ color: '#4b5563' }}>
        {description}
      </Typography>
    </Box>
  )
}

export default InfoBanner
