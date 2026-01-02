import React from 'react'
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material'
import { CheckCircle, Schedule, Cancel } from '@mui/icons-material'
import { QuickStatsStyles } from './QuickStats.styles'

function QuickStats({ stats }) {
  return (
    <Card sx={QuickStatsStyles.card}>
      <CardContent sx={QuickStatsStyles.content}>
        <Typography variant="h6" sx={QuickStatsStyles.title}>
          Quick Stats
        </Typography>
        <Box sx={QuickStatsStyles.statsContainer}>
          <Box sx={QuickStatsStyles.statItem}>
            <Box sx={QuickStatsStyles.statHeader}>
              <CheckCircle sx={QuickStatsStyles.icon} />
              <Typography variant="body2" sx={QuickStatsStyles.statLabel}>
                Completion Rate
              </Typography>
            </Box>
            <Typography variant="h5" sx={QuickStatsStyles.statValue}>
              {stats.completionRate}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={stats.completionRate}
              sx={QuickStatsStyles.progress}
            />
          </Box>
          <Box sx={QuickStatsStyles.statItem}>
            <Box sx={QuickStatsStyles.statHeader}>
              <Schedule sx={{ ...QuickStatsStyles.icon, color: '#ff9800' }} />
              <Typography variant="body2" sx={QuickStatsStyles.statLabel}>
                Incomplete Reviews
              </Typography>
            </Box>
            <Typography variant="h5" sx={QuickStatsStyles.statValue}>
              {stats.incompleteReviews}
            </Typography>
          </Box>
          <Box sx={QuickStatsStyles.statItem}>
            <Box sx={QuickStatsStyles.statHeader}>
              <Cancel sx={{ ...QuickStatsStyles.icon, color: '#f44336' }} />
              <Typography variant="body2" sx={QuickStatsStyles.statLabel}>
                Cancellations
              </Typography>
            </Box>
            <Typography variant="h5" sx={QuickStatsStyles.statValue}>
              {stats.cancellations}
            </Typography>
            <Typography variant="caption" sx={QuickStatsStyles.statNote}>
              {stats.cancellationPercentage}% of total
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default QuickStats

