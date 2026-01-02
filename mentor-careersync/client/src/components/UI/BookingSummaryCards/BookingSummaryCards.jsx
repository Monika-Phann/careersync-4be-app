import React from 'react'
import { Grid, Card, CardContent, Typography, Box } from '@mui/material'
import { BookingSummaryCardsStyles } from './BookingSummaryCards.styles'

function BookingSummaryCards({ stats }) {
  return (
    <Grid container spacing={3} sx={BookingSummaryCardsStyles.container}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={stats.length === 3 ? 4 : 3} key={index}>
          <Card sx={BookingSummaryCardsStyles.card}>
            <CardContent>
              <Typography variant="body2" sx={BookingSummaryCardsStyles.label}>
                {stat.label}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  ...BookingSummaryCardsStyles.value,
                  color: stat.color || '#1976d2',
                }}
              >
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default BookingSummaryCards

