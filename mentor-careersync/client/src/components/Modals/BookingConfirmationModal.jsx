import React from 'react'
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from '@mui/material'
import { Close as CloseIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@mui/icons-material'
import { BookingConfirmationModalStyles } from './BookingConfirmationModal.styles'

function BookingConfirmationModal({ open, onClose, type = 'accepted' }) {
  const isAccepted = type === 'accepted'

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: BookingConfirmationModalStyles.dialogPaper,
      }}
    >
      <DialogContent sx={BookingConfirmationModalStyles.dialogContent}>
        <Box sx={BookingConfirmationModalStyles.container}>
          <IconButton
            onClick={onClose}
            sx={BookingConfirmationModalStyles.closeButton}
            size="small"
          >
            <CloseIcon />
          </IconButton>
          
          <Box sx={BookingConfirmationModalStyles.logoContainer}>
            <Box
              component="img"
              src="/logo/careersyncLogo.svg"
              alt="CareerSync"
              sx={BookingConfirmationModalStyles.logoImage}
            />
          </Box>

          <Box
            sx={{
              ...BookingConfirmationModalStyles.iconContainer,
              backgroundColor: isAccepted
                ? BookingConfirmationModalStyles.successBg.backgroundColor
                : BookingConfirmationModalStyles.errorBg.backgroundColor,
            }}
          >
            {isAccepted ? (
              <CheckCircleIcon sx={BookingConfirmationModalStyles.successIcon} />
            ) : (
              <CancelIcon sx={BookingConfirmationModalStyles.errorIcon} />
            )}
          </Box>

          <Typography variant="h5" sx={BookingConfirmationModalStyles.title}>
            Booking {isAccepted ? 'Accepted' : 'Rejected'}!
          </Typography>

          <Typography variant="body1" sx={BookingConfirmationModalStyles.message}>
            {isAccepted
              ? 'You have accepted a booking request. You can now view all details in your booking management.'
              : 'You have rejected a booking request. You can now view all history in your booking requests history.'}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default BookingConfirmationModal

