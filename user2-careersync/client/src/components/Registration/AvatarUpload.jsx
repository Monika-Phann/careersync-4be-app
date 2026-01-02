import { useState, useRef } from 'react'
import { Box, Avatar, IconButton } from '@mui/material'
import { PersonOutline, CloudUploadOutlined } from '@mui/icons-material'

function AvatarUpload({ onImageChange, hasError }) {
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB')
      return
    }

    // Create preview URL
    const url = URL.createObjectURL(file)
    setImagePreview(url)

    // Call parent callback if provided
    if (onImageChange) {
      onImageChange(file, url)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Avatar
        component="label"
        htmlFor="avatar-upload-input"
        src={imagePreview || undefined}
        sx={{
          width: 176,
          height: 176,
          bgcolor: '#f1f5f9',
          color: '#9ca3af',
          border: hasError ? '2px solid #ef4444' : '2px solid #e5e7eb',
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.9,
          },
        }}
      >
        {!imagePreview && <PersonOutline sx={{ fontSize: 72 }} />}
      </Avatar>
      <input
        id="avatar-upload-input"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <IconButton
        size="small"
        color="primary"
        onClick={handleUploadClick}
        sx={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          bgcolor: '#b3daf7',
          border: '3px solid #fff',
          '&:hover': { bgcolor: '#9bcaed' },
        }}
        aria-label="Upload avatar"
      >
        <CloudUploadOutlined fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default AvatarUpload
