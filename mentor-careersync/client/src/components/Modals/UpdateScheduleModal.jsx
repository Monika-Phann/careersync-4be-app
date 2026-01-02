import React, { useState } from 'react'
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material'
import { Close as CloseIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'
import { UpdateScheduleModalStyles } from './UpdateScheduleModal.styles'

const durationOptions = ['30 min', '45 min', '60 min', '90 min', '120 min']
const locationOptions = [
  'Phnom Penh, Koh Norea, ...',
  'Starbucks Reserve Roastery, Seattle',
  'Virtual Meeting',
]

function UpdateScheduleModal({ open, onClose }) {
  const [sessionRate, setSessionRate] = useState('10.00')
  const [duration, setDuration] = useState('60 min')
  const [location, setLocation] = useState('Phnom Penh, Koh Norea, ...')
  const [timeSlots, setTimeSlots] = useState([
    { day: 'Thursday', start: '2:00PM', end: '3:00PM' },
    { day: 'Thursday', start: '5:00PM', end: '6:00PM' },
    { day: 'Saturday', start: '5:00PM', end: '6:00PM' },
  ])

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { day: 'Monday', start: '9:00AM', end: '10:00AM' }])
  }

  const handleRemoveTimeSlot = (index) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    // Handle save logic here
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: UpdateScheduleModalStyles.dialogPaper,
      }}
    >
      <DialogTitle sx={UpdateScheduleModalStyles.dialogTitle}>
        <Typography variant="h6" sx={UpdateScheduleModalStyles.title}>
          Update Your Schedule
        </Typography>
        <IconButton
          onClick={onClose}
          sx={UpdateScheduleModalStyles.closeButton}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={UpdateScheduleModalStyles.dialogContent}>
        <Box sx={UpdateScheduleModalStyles.formContainer}>
          {/* Session Rate */}
          <TextField
            label="Session Rate"
            value={`$${sessionRate}`}
            onChange={(e) => setSessionRate(e.target.value.replace('$', ''))}
            fullWidth
            sx={UpdateScheduleModalStyles.textField}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
          />

          {/* Duration */}
          <FormControl fullWidth sx={UpdateScheduleModalStyles.textField}>
            <InputLabel>Duration</InputLabel>
            <Select value={duration} onChange={(e) => setDuration(e.target.value)} label="Duration">
              {durationOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Meeting Location */}
          <FormControl fullWidth sx={UpdateScheduleModalStyles.textField}>
            <InputLabel>Meeting Location</InputLabel>
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              label="Meeting Location"
            >
              {locationOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Start Time Slots */}
          <Box sx={UpdateScheduleModalStyles.timeSlotsSection}>
            <Typography variant="subtitle2" sx={UpdateScheduleModalStyles.timeSlotsTitle}>
              Start Time
            </Typography>
            {timeSlots.map((slot, index) => (
              <Box key={index} sx={UpdateScheduleModalStyles.timeSlotItem}>
                <Chip
                  label={`${slot.day}: ${slot.start} - ${slot.end}`}
                  sx={UpdateScheduleModalStyles.timeSlotChip}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveTimeSlot(index)}
                  sx={UpdateScheduleModalStyles.deleteButton}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={handleAddTimeSlot}
              sx={UpdateScheduleModalStyles.addButton}
            >
              Create more
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={UpdateScheduleModalStyles.dialogActions}>
        <Button onClick={onClose} sx={UpdateScheduleModalStyles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" sx={UpdateScheduleModalStyles.saveButton}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateScheduleModal

