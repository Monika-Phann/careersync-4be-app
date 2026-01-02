import React from 'react'
import { Card, CardContent, Typography, Box, List, ListItem } from '@mui/material'
import { AccessTime } from '@mui/icons-material'
import { ScheduleCardStyles } from './ScheduleCard.styles'

function ScheduleCard({ title, items }) {
  // Safely handle empty or undefined items array
  const scheduleItems = items || []
  const hasItems = scheduleItems.length > 0

  return (
    <Card sx={ScheduleCardStyles.card}>
      <CardContent sx={ScheduleCardStyles.content}>
        <Typography variant="h6" sx={ScheduleCardStyles.title}>
          {title}
        </Typography>
        {hasItems ? (
          <List sx={ScheduleCardStyles.list}>
            {scheduleItems.map((item, index) => (
              <ListItem key={index} sx={ScheduleCardStyles.listItem}>
                <AccessTime sx={ScheduleCardStyles.timeIcon} />
                <Box sx={ScheduleCardStyles.itemContent}>
                  <Typography variant="body1" sx={ScheduleCardStyles.time}>
                    {item.time}
                  </Typography>
                  <Typography variant="body2" sx={ScheduleCardStyles.name}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" sx={ScheduleCardStyles.duration}>
                    {item.duration}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px 20px',
              color: '#666',
            }}
          >
            <Typography variant="body1">
              No sessions scheduled for today
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default ScheduleCard

