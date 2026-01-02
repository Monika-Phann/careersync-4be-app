import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Box,
} from '@mui/material'
import { BookingsTableStyles } from './BookingsTable.styles'

const statusColors = {
  Completed: { color: '#4caf50', bgColor: '#e8f5e9' },
  Incomplete: { color: '#ff9800', bgColor: '#fff3e0' },
  Canceled: { color: '#f44336', bgColor: '#ffebee' },
}

function BookingsTable({ title, bookings }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  const getAvatarColor = (initials) => {
    const colors = ['#1976d2', '#42a5f5', '#666666', '#9c27b0']
    const index = initials.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <Card sx={BookingsTableStyles.card}>
      <CardContent sx={BookingsTableStyles.content}>
        <Typography variant="h6" sx={BookingsTableStyles.title}>
          {title}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={BookingsTableStyles.headerCell}>User</TableCell>
                <TableCell sx={BookingsTableStyles.headerCell}>Program</TableCell>
                <TableCell sx={BookingsTableStyles.headerCell}>Date</TableCell>
                <TableCell sx={BookingsTableStyles.headerCell}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id} sx={BookingsTableStyles.tableRow}>
                  <TableCell>
                    <Box sx={BookingsTableStyles.userCell}>
                      <Avatar
                        sx={{
                          ...BookingsTableStyles.avatar,
                          backgroundColor: getAvatarColor(booking.user.initials),
                        }}
                      >
                        {booking.user.initials}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={BookingsTableStyles.userName}>
                          {booking.user.name}
                        </Typography>
                        <Typography variant="caption" sx={BookingsTableStyles.userEmail}>
                          {booking.user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{booking.program}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{booking.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={booking.status}
                      size="small"
                      sx={{
                        ...BookingsTableStyles.statusChip,
                        color: statusColors[booking.status]?.color || '#666',
                        backgroundColor:
                          statusColors[booking.status]?.bgColor || '#f5f5f5',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default BookingsTable

