import { useState } from 'react'
import { FiMail, FiLock, FiUser, FiPhone, FiCalendar, FiMapPin, FiBriefcase } from 'react-icons/fi'
import { PiIdentificationBadge, PiBuildings } from 'react-icons/pi'
import { InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { InputGroup, StyledTextField } from './FormInput.styles'

const iconMap = {
  email: <FiMail size={18} />,
  password: <FiLock size={18} />,
  user: <FiUser size={18} />,
  phone: <FiPhone size={18} />,
  date: <FiCalendar size={18} />,
  location: <FiMapPin size={18} />,
  id: <PiIdentificationBadge size={18} />,
  briefcase: <FiBriefcase size={18} />,
  building: <PiBuildings size={18} />,
}

function FormInput({ label, type = 'text', placeholder, icon = 'user', error, helperText, ...rest }) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <InputGroup>
      <StyledTextField
        label={label}
        type={inputType}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {iconMap[icon]}
            </InputAdornment>
          ),
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowPassword((prev) => !prev)}
                size="small"
                sx={{ color: error ? '#ef4444' : '#6b7280' }}
                aria-label={showPassword ? 'hide password' : 'show password'}
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
        {...rest}
      />
    </InputGroup>
  )
}

export default FormInput

