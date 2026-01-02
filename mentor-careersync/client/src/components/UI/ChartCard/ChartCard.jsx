import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { ChartCardStyles } from './ChartCard.styles'

function ChartCard({ title, subtitle, children, height = 350 }) {
  return (
    <Card sx={ChartCardStyles.card}>
      <CardContent sx={ChartCardStyles.content}>
        <Box sx={ChartCardStyles.header}>
          <Box>
            <Typography variant="h6" sx={ChartCardStyles.title}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" sx={ChartCardStyles.subtitle}>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ ...ChartCardStyles.chartContainer, height }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  )
}

export default ChartCard

