import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { BookingDetailsModalStyles } from './BookingDetailsModal.styles'

const statusColors = {
  Completed: { color: '#4caf50', bgColor: '#e8f5e9' },
  Incomplete: { color: '#ff9800', bgColor: '#fff3e0' },
  Canceled: { color: '#f44336', bgColor: '#ffebee' },
  Accepted: { color: '#4caf50', bgColor: '#e8f5e9' },
  Rejected: { color: '#f44336', bgColor: '#ffebee' },
  Pending: { color: '#1976d2', bgColor: '#e3f2fd' },
}

function BookingDetailsModal({ open, onClose, booking }) {
  if (!booking) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: BookingDetailsModalStyles.dialogPaper,
      }}
    >
      <DialogTitle sx={BookingDetailsModalStyles.dialogTitle}>
        <Box>
          <Typography variant="h6" sx={BookingDetailsModalStyles.title}>
            Booking Details
          </Typography>
          <Typography variant="body2" sx={BookingDetailsModalStyles.subtitle}>
            Complete information about booking
          </Typography>
          <Typography variant="body2" sx={BookingDetailsModalStyles.bookingId}>
            {booking.id}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={BookingDetailsModalStyles.closeButton}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={BookingDetailsModalStyles.dialogContent}>
        <Box sx={BookingDetailsModalStyles.userSection}>
          <Typography variant="h6" sx={BookingDetailsModalStyles.userName}>
            {booking.user.name}
          </Typography>
          <Typography variant="body2" sx={BookingDetailsModalStyles.userEmail}>
            {booking.user.email}
          </Typography>
        </Box>

        <Box sx={BookingDetailsModalStyles.infoGrid}>
          <Box sx={BookingDetailsModalStyles.infoItem}>
            <Typography variant="body2" sx={BookingDetailsModalStyles.infoLabel}>
              Booking ID
            </Typography>
            <Typography variant="body1" sx={BookingDetailsModalStyles.infoValue}>
              {booking.id}
            </Typography>
          </Box>

          <Box sx={BookingDetailsModalStyles.infoItem}>
            <Typography variant="body2" sx={BookingDetailsModalStyles.infoLabel}>
              Status
            </Typography>
            <Chip
              label={booking.status}
              size="small"
              sx={{
                ...BookingDetailsModalStyles.statusChip,
                color: statusColors[booking.status]?.color || '#666',
                backgroundColor: statusColors[booking.status]?.bgColor || '#f5f5f5',
              }}
            />
          </Box>

          <Box sx={BookingDetailsModalStyles.infoItem}>
            <Typography variant="body2" sx={BookingDetailsModalStyles.infoLabel}>
              Program Name
            </Typography>
            <Typography variant="body1" sx={BookingDetailsModalStyles.infoValue}>
              {booking.programName || 'Software developer'}
            </Typography>
          </Box>

          <Box sx={BookingDetailsModalStyles.infoItem}>
            <Typography variant="body2" sx={BookingDetailsModalStyles.infoLabel}>
              Meeting Date
            </Typography>
            <Typography variant="body1" sx={BookingDetailsModalStyles.infoValue}>
              {booking.meetingDate || booking.dateTime?.split(',')[0]}
            </Typography>
          </Box>

          <Box sx={BookingDetailsModalStyles.infoItem}>
            <Typography variant="body2" sx={BookingDetailsModalStyles.infoLabel}>
              Booking Date
            </Typography>
            <Typography variant="body1" sx={BookingDetailsModalStyles.infoValue}>
              {booking.bookingDate || booking.dateTime?.split(',')[0]}
            </Typography>
          </Box>

          <Box sx={BookingDetailsModalStyles.infoItem}>
            <Typography variant="body2" sx={BookingDetailsModalStyles.infoLabel}>
              Meeting Location
            </Typography>
            <Typography variant="body1" sx={BookingDetailsModalStyles.infoValue}>
              {booking.meetingLocation || 'Starbucks, Seattle'}
            </Typography>
          </Box>

          <Box sx={BookingDetailsModalStyles.infoItem}>
            <Typography variant="body2" sx={BookingDetailsModalStyles.infoLabel}>
              Amount
            </Typography>
            <Typography variant="body1" sx={BookingDetailsModalStyles.infoValueTotal}>
              ${booking.amount}
            </Typography>
          </Box>

          {booking.commission && (
            <Box sx={BookingDetailsModalStyles.infoItem}>
              <Typography variant="body2" sx={BookingDetailsModalStyles.infoLabel}>
                Commission (15%)
              </Typography>
              <Typography
                variant="body1"
                sx={BookingDetailsModalStyles.infoValueCommission}
              >
                ${booking.commission}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default BookingDetailsModal

