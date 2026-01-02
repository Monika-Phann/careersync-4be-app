import { useRef } from 'react'
import { FormControl, FormLabel, Box, Typography } from '@mui/material'
import { CloudUploadOutlined } from '@mui/icons-material'

function FileUploadField({ label, required = false, onChange, text }) {
  const inputRef = useRef(null)

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleChange = (event) => {
    if (onChange) {
      onChange(event)
    }
  }

  return (
    <FormControl fullWidth>
      <FormLabel
        required={required}
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: '#111827',
          mb: 0.5,
        }}
      >
        {label}
      </FormLabel>
      <Box
        onClick={handleClick}
        sx={{
          border: '1px solid #cfd4dc',
          backgroundColor: '#e5e7eb',
          borderRadius: '10px',
          px: 1.5,
          py: 1.25,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
        }}
      >
        <CloudUploadOutlined fontSize="small" sx={{ color: '#6b7280' }} />
        <Typography variant="body2" sx={{ color: '#4b5563', fontWeight: 500 }}>
          {text}
        </Typography>
        <input type="file" ref={inputRef} onChange={handleChange} style={{ display: 'none' }} />
      </Box>
    </FormControl>
  )
}

export default FileUploadField
