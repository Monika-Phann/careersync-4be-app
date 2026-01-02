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
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { UpdateContactModalStyles } from './UpdateContactModal.styles'

function UpdateContactModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    email: 'monika00001@gmail.com',
    phone: '+1 (555) 12345678',
    portfolio1: 'linkedin.com/in/monika',
    portfolio2: 'CV/monika.com/portfolio',
  })

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value })
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
        sx: UpdateContactModalStyles.dialogPaper,
      }}
    >
      <DialogTitle sx={UpdateContactModalStyles.dialogTitle}>
        <Typography variant="h6" sx={UpdateContactModalStyles.title}>
          Update Your Contact
        </Typography>
        <IconButton
          onClick={onClose}
          sx={UpdateContactModalStyles.closeButton}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={UpdateContactModalStyles.dialogContent}>
        <Box sx={UpdateContactModalStyles.formContainer}>
          <TextField
            label="Email address"
            value={formData.email}
            onChange={handleChange('email')}
            fullWidth
            type="email"
            sx={UpdateContactModalStyles.textField}
          />

          <TextField
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange('phone')}
            fullWidth
            type="tel"
            sx={UpdateContactModalStyles.textField}
          />

          <TextField
            label="Portfolio"
            value={formData.portfolio1}
            onChange={handleChange('portfolio1')}
            fullWidth
            sx={UpdateContactModalStyles.textField}
          />

          <TextField
            label="Portfolio"
            value={formData.portfolio2}
            onChange={handleChange('portfolio2')}
            fullWidth
            sx={UpdateContactModalStyles.textField}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={UpdateContactModalStyles.dialogActions}>
        <Button onClick={onClose} sx={UpdateContactModalStyles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" sx={UpdateContactModalStyles.saveButton}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateContactModal

