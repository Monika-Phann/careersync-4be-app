import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Chip,
  Avatar,
  Button,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { UserDetailsModalStyles } from './UserDetailsModal.styles'

const topRightStatusColors = {
  Accepted: { color: '#1447E6', bg: '#E8F0FF', border: '#C6D4FF' },
  Completed: { color: '#008236', bg: '#E8F5E9', border: '#C8E6C9' },
  Incompleted: { color: '#CA3500', bg: '#FFF3E0', border: '#FFD7A8' },
}

function UserDetailsModal({ open, onClose, user, onAccept, onReject, topRightStatus }) {
  if (!user) return null

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: UserDetailsModalStyles.dialogPaper,
      }}
    >
      <DialogTitle sx={UserDetailsModalStyles.dialogTitle}>
        <Box>
          <Typography variant="h6" sx={UserDetailsModalStyles.title}>
            User Details
          </Typography>
          <Typography variant="body2" sx={UserDetailsModalStyles.subtitle}>
            Complete information about user {user.userId || user.id}
          </Typography>
        </Box>
        <Box sx={UserDetailsModalStyles.dialogTitleRight}>
          {topRightStatus && (
            <Chip
              label={topRightStatus}
              size="small"
              sx={{
                ...UserDetailsModalStyles.topRightStatusChip,
                color: topRightStatusColors[topRightStatus]?.color || '#155DFC',
                backgroundColor: topRightStatusColors[topRightStatus]?.bg || '#E8F0FF',
                border: `1px solid ${
                  topRightStatusColors[topRightStatus]?.border || '#C6D4FF'
                }`,
              }}
            />
          )}
          <IconButton
            onClick={onClose}
            sx={UserDetailsModalStyles.closeButton}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={UserDetailsModalStyles.dialogContent}>
        <Box sx={UserDetailsModalStyles.userHeader}>
          <Avatar
            sx={UserDetailsModalStyles.avatar}
          >
            {getInitials(user.name || `${user.firstName} ${user.lastName}`)}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={UserDetailsModalStyles.userName}>
              {user.name || `${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography variant="body2" sx={UserDetailsModalStyles.userEmail}>
              {user.email}
            </Typography>
            {user.role && (
              <Chip
                label={user.role}
                size="small"
                sx={UserDetailsModalStyles.roleChipInline}
              />
            )}
          </Box>
        </Box>

        <Box sx={UserDetailsModalStyles.section}>
          <Typography variant="subtitle1" sx={UserDetailsModalStyles.sectionTitle}>
            Account Information
          </Typography>
          <Box sx={UserDetailsModalStyles.infoGrid}>
            <Box sx={UserDetailsModalStyles.infoItem}>
              <Typography variant="body2" sx={UserDetailsModalStyles.infoLabel}>
                User ID
              </Typography>
              <Typography variant="body1" sx={UserDetailsModalStyles.infoValue}>
                {user.userId || user.id}
              </Typography>
            </Box>
            <Box sx={UserDetailsModalStyles.infoItem}>
              <Typography variant="body2" sx={UserDetailsModalStyles.infoLabel}>
                First Name
              </Typography>
              <Typography variant="body1" sx={UserDetailsModalStyles.infoValue}>
                {user.firstName || user.name?.split(' ')[0]}
              </Typography>
            </Box>
            <Box sx={UserDetailsModalStyles.infoItem}>
              <Typography variant="body2" sx={UserDetailsModalStyles.infoLabel}>
                Last Name
              </Typography>
              <Typography variant="body1" sx={UserDetailsModalStyles.infoValue}>
                {user.lastName || user.name?.split(' ').slice(1).join(' ')}
              </Typography>
            </Box>
            <Box sx={UserDetailsModalStyles.infoItem}>
              <Typography variant="body2" sx={UserDetailsModalStyles.infoLabel}>
                Email Address
              </Typography>
              <Typography variant="body1" sx={UserDetailsModalStyles.infoValue}>
                {user.email}
              </Typography>
            </Box>
            <Box sx={UserDetailsModalStyles.infoItem}>
              <Typography variant="body2" sx={UserDetailsModalStyles.infoLabel}>
                Phone Number
              </Typography>
              <Typography variant="body1" sx={UserDetailsModalStyles.infoValue}>
                {user.phone || user.phoneNumber || 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={UserDetailsModalStyles.section}>
          <Typography variant="subtitle1" sx={UserDetailsModalStyles.sectionTitle}>
            Personal Information
          </Typography>
          <Box sx={UserDetailsModalStyles.infoGrid}>
            <Box sx={UserDetailsModalStyles.infoItem}>
              <Typography variant="body2" sx={UserDetailsModalStyles.infoLabel}>
                Gender
              </Typography>
              <Typography variant="body1" sx={UserDetailsModalStyles.infoValue}>
                {user.gender || 'N/A'}
              </Typography>
            </Box>
            <Box sx={UserDetailsModalStyles.infoItem}>
              <Typography variant="body2" sx={UserDetailsModalStyles.infoLabel}>
                Date of Birth
              </Typography>
              <Typography variant="body1" sx={UserDetailsModalStyles.infoValue}>
                {user.dateOfBirth || user.dob || 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ ...UserDetailsModalStyles.section, borderBottom: 'none', marginBottom: 0 }}>
          <Typography variant="subtitle1" sx={UserDetailsModalStyles.sectionTitle}>
            Education & Employment
          </Typography>
          <Box sx={UserDetailsModalStyles.infoGrid}>
            <Box sx={UserDetailsModalStyles.infoItem}>
              <Typography variant="body2" sx={UserDetailsModalStyles.infoLabel}>
                Status
              </Typography>
              <Typography variant="body1" sx={UserDetailsModalStyles.infoValue}>
                {user.status || user.role || 'N/A'}
              </Typography>
            </Box>
            <Box sx={UserDetailsModalStyles.infoItem}>
              <Typography variant="body2" sx={UserDetailsModalStyles.infoLabel}>
                Current or Last Institution Name
              </Typography>
              <Typography variant="body1" sx={UserDetailsModalStyles.infoValue}>
                {user.institution || 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {(onAccept || onReject) && (
        <DialogActions sx={UserDetailsModalStyles.dialogActions}>
          {onAccept && (
            <Button
              variant="contained"
              onClick={() => {
                onAccept(user)
                onClose()
              }}
              sx={UserDetailsModalStyles.acceptButton}
            >
              Accept
            </Button>
          )}
          {onReject && (
            <Button
              variant="contained"
              onClick={() => {
                onReject(user)
                onClose()
              }}
              sx={UserDetailsModalStyles.rejectButton}
            >
              Reject
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default UserDetailsModal

