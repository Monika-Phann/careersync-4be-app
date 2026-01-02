import React from 'react'
import { Card, CardContent, Box, Typography } from '@mui/material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'
import { StatCardStyles } from './StatCard.styles'
import BookingIcon from '../../../assets/icons/ttl-booking.svg'
import RevenueIcon from '../../../assets/icons/ttl-revenue.svg'
import CertificateIcon from '../../../assets/icons/ttl-certificate.svg'

const iconMap = {
  calendar: BookingIcon,
  dollar: RevenueIcon,
  certificate: CertificateIcon,
}

function StatCard({ title, value, change, icon }) {
  const IconSrc = iconMap[icon] || BookingIcon
  const formattedValue =
    title === 'Total Revenue'
      ? `$${typeof value === 'number' ? value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value}`
      : typeof value === 'number' ? value.toLocaleString() : value

  const isPositive = change >= 0
  const changeValue = typeof change === 'number' ? Math.abs(change).toFixed(1) : change

  return (
    <Card sx={StatCardStyles.card}>
      <CardContent sx={StatCardStyles.content}>
        <Box sx={StatCardStyles.header}>
          <Box sx={StatCardStyles.iconContainer}>
            <img src={IconSrc} alt={title} style={StatCardStyles.icon} />
          </Box>
        </Box>
        <Typography variant="h4" sx={StatCardStyles.value}>
          {formattedValue}
        </Typography>
        <Typography variant="body2" sx={StatCardStyles.title}>
          {title}
        </Typography>
        <Box sx={StatCardStyles.changeContainer}>
          {isPositive ? (
            <TrendingUp sx={{ ...StatCardStyles.trendIcon, color: '#4caf50' }} />
          ) : (
            <TrendingDown sx={{ ...StatCardStyles.trendIcon, color: '#f44336' }} />
          )}
          <Typography
            variant="body2"
            sx={{
              ...StatCardStyles.change,
              color: isPositive ? '#4caf50' : '#f44336',
            }}
          >
            {isPositive ? '+' : '-'}{changeValue}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default StatCard

