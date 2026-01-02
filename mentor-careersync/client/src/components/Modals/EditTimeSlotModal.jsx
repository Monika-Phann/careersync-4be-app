import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { EditTimeSlotModalStyles } from './EditTimeSlotModal.styles'
import { updateTimeslot } from '../../api/timeslotApi'

function EditTimeSlotModal({ open, onClose, timeSlot }) {
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (timeSlot && timeSlot.start_time) {
      // Format the start_time and end_time to display format
      const startDate = new Date(timeSlot.start_time)
      const endDate = new Date(timeSlot.end_time)
      
      // Format as DD/MM/YYYY, HH:MM AM/PM
      const formatDateTime = (date) => {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        const hours = date.getHours()
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const displayHours = hours % 12 || 12
        return `${day}/${month}/${year}, ${displayHours}:${minutes} ${ampm}`
      }
      
      setStartDateTime(formatDateTime(startDate))
      setEndDateTime(formatDateTime(endDate))
    }
  }, [timeSlot])

  const parseDateTime = (dateTimeStr) => {
    // Handle format: "DD/MM/YYYY, HH:MM AM/PM" or ISO format
    try {
      // Try parsing as-is first (for ISO format)
      const parsed = new Date(dateTimeStr)
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString()
      }

      // Try parsing DD/MM/YYYY, HH:MM AM/PM format
      const parts = dateTimeStr.split(',')
      if (parts.length === 2) {
        const datePart = parts[0].trim()
        const timePart = parts[1].trim()
        
        const [day, month, year] = datePart.split('/')
        const date = new Date(`${year}-${month}-${day} ${timePart}`)
        
        if (!isNaN(date.getTime())) {
          return date.toISOString()
        }
      }

      throw new Error('Invalid date format')
    } catch (err) {
      throw new Error('Please use format: DD/MM/YYYY, HH:MM AM/PM')
    }
  }

  const handleSave = async () => {
    if (!timeSlot || !timeSlot.id) {
      setError('Invalid timeslot selected')
      return
    }

    if (!startDateTime || !endDateTime) {
      setError('Please enter both start and end date/time')
      return
    }

    try {
      setSaving(true)
      setError(null)

      // Parse date/time strings to ISO format
      const startTime = parseDateTime(startDateTime)
      const endTime = parseDateTime(endDateTime)

      if (new Date(startTime) >= new Date(endTime)) {
        setError('End time must be after start time')
        setSaving(false)
        return
      }

      // Call API to update timeslot
      const result = await updateTimeslot(timeSlot.id, {
        start_time: startTime,
        end_time: endTime
      })

      if (result.success) {
        // Close modal and let parent refresh
        onClose()
      } else {
        setError(result.message || 'Failed to update timeslot')
      }
    } catch (err) {
      console.error('Error updating timeslot:', err)
      setError(err.message || 'Failed to update timeslot. Please check the date/time format.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: EditTimeSlotModalStyles.dialogPaper,
      }}
    >
      <DialogTitle sx={EditTimeSlotModalStyles.dialogTitle}>
        <Typography variant="h6" sx={EditTimeSlotModalStyles.title}>
          Edit Time Slots
        </Typography>
        <IconButton
          onClick={onClose}
          sx={EditTimeSlotModalStyles.closeButton}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={EditTimeSlotModalStyles.dialogContent}>
        <Box sx={EditTimeSlotModalStyles.formSection}>
          <TextField
            fullWidth
            label="Start Date & Time"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            sx={EditTimeSlotModalStyles.textField}
            placeholder="DD/MM/YYYY, HH:MM AM/PM"
            required
            helperText="Format: DD/MM/YYYY, HH:MM AM/PM (e.g., 23/12/2025, 10:00 AM)"
          />
          <TextField
            fullWidth
            label="End Date & Time"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            sx={EditTimeSlotModalStyles.textField}
            placeholder="DD/MM/YYYY, HH:MM AM/PM"
            required
            helperText="Format: DD/MM/YYYY, HH:MM AM/PM (e.g., 23/12/2025, 11:00 AM)"
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={EditTimeSlotModalStyles.dialogActions}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={EditTimeSlotModalStyles.cancelButton}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={EditTimeSlotModalStyles.saveButton}
          disabled={saving}
        >
          {saving ? <CircularProgress size={20} /> : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditTimeSlotModal

