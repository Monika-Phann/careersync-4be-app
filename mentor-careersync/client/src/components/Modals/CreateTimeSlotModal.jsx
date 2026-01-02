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
  MenuItem,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { CreateTimeSlotModalStyles } from './CreateTimeSlotModal.styles'
import { addTimeslots } from '../../api/timeslotApi'
import { getMySessions } from '../../api/sessionApi'

function CreateTimeSlotModal({ open, onClose }) {
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')
  const [sessions, setSessions] = useState([])
  const [selectedSessionId, setSelectedSessionId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  // Fetch sessions when modal opens
  useEffect(() => {
    if (open) {
      fetchSessions()
    }
  }, [open])

  const fetchSessions = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await getMySessions()
      if (result.success && result.data && result.data.length > 0) {
        setSessions(result.data)
        // Auto-select first session if available
        if (result.data[0]?.id) {
          setSelectedSessionId(result.data[0].id)
        }
      } else {
        // No sessions found - allow auto-creation using 'auto-create' flag
        setSessions([])
        setSelectedSessionId('auto-create') // Special flag to auto-create session
      }
    } catch (err) {
      console.error('Error fetching sessions:', err)
      setError('Failed to load sessions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
    // Allow saving even if no session selected (will auto-create using profile data)
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

      // Call API to create timeslot
      // If selectedSessionId is 'auto-create' or not set, pass null to trigger auto-creation
      const sessionIdForApi = (selectedSessionId && selectedSessionId !== 'auto-create') ? selectedSessionId : null
      const result = await addTimeslots(sessionIdForApi, [
        {
          start_time: startTime,
          end_time: endTime
        }
      ])

      if (result.success) {
        // Close modal and let parent refresh
        onClose()
      } else {
        setError(result.message || 'Failed to create timeslot')
      }
    } catch (err) {
      console.error('Error creating timeslot:', err)
      setError(err.message || 'Failed to create timeslot. Please check the date/time format.')
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
        sx: CreateTimeSlotModalStyles.dialogPaper,
      }}
    >
      <DialogTitle sx={CreateTimeSlotModalStyles.dialogTitle}>
        <Typography variant="h6" sx={CreateTimeSlotModalStyles.title}>
          Create New Time Slots
        </Typography>
        <IconButton
          onClick={onClose}
          sx={CreateTimeSlotModalStyles.closeButton}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={CreateTimeSlotModalStyles.dialogContent}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error && selectedSessionId !== 'auto-create' ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : (
          <Box sx={CreateTimeSlotModalStyles.formSection}>
            {sessions.length > 0 ? (
              <TextField
                fullWidth
                select
                label="Session"
                value={selectedSessionId}
                onChange={(e) => setSelectedSessionId(e.target.value)}
                sx={CreateTimeSlotModalStyles.textField}
                required
              >
                {sessions.map((session) => (
                  <MenuItem key={session.id} value={session.id}>
                    {session.location_name || session.Position?.position_name || session.id} - ${session.price}
                  </MenuItem>
                ))}
              </TextField>
            ) : selectedSessionId === 'auto-create' ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                No existing sessions found. A new session will be created automatically using your profile's session rate and location.
              </Alert>
            ) : null}
            <TextField
              fullWidth
              label="Start Date & Time"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              sx={CreateTimeSlotModalStyles.textField}
              placeholder="DD/MM/YYYY, HH:MM AM/PM"
              required
              helperText="Format: DD/MM/YYYY, HH:MM AM/PM (e.g., 23/12/2025, 10:00 AM)"
            />
            <TextField
              fullWidth
              label="End Date & Time"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              sx={CreateTimeSlotModalStyles.textField}
              placeholder="DD/MM/YYYY, HH:MM AM/PM"
              required
              helperText="Format: DD/MM/YYYY, HH:MM AM/PM (e.g., 23/12/2025, 11:00 AM)"
            />
            {error && selectedSessionId && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={CreateTimeSlotModalStyles.dialogActions}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={CreateTimeSlotModalStyles.cancelButton}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={CreateTimeSlotModalStyles.saveButton}
          disabled={saving || loading}
        >
          {saving ? <CircularProgress size={20} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateTimeSlotModal

