import { FormControl, FormLabel, TextField, InputAdornment } from '@mui/material'

function InputField({ label, placeholder, required, Icon, type = 'text', error, helperText, ...rest }) {
  return (
    <FormControl fullWidth error={error}>
      <FormLabel
        required={required}
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: error ? '#ef4444' : '#111827',
          mb: 0.5,
        }}
      >
        {label}
      </FormLabel>
      <TextField
        variant="filled"
        placeholder={placeholder}
        type={type}
        required={required}
        fullWidth
        error={error}
        helperText={helperText}
        sx={{
          '& .MuiFilledInput-root': {
            border: error ? '1px solid #ef4444' : '1px solid #cfd4dc',
            backgroundColor: '#e5e7eb',
            borderRadius: '10px',
            px: 1,
            height: 52,
            display: 'flex',
            alignItems: 'center',
            '&:before, &:after': { display: 'none' },
            '&.Mui-focused': {
              borderColor: error ? '#ef4444' : '#0c3c82',
              boxShadow: error ? '0 0 0 2px rgba(239, 68, 68, 0.12)' : '0 0 0 2px rgba(12, 60, 130, 0.12)',
              backgroundColor: '#e5e7eb',
            },
            '& input': {
              padding: '14px 0 14px 4px',
            },
          },
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
            marginTop: 0.5,
            fontSize: '12px',
          },
        }}
        InputProps={{
          startAdornment: Icon ? (
            <InputAdornment position="start">
              <Icon fontSize="small" sx={{ color: error ? '#ef4444' : '#6b7280' }} />
            </InputAdornment>
          ) : undefined,
          disableUnderline: true,
        }}
        InputLabelProps={{ shrink: true }}
        {...rest}
      />
    </FormControl>
  )
}

export default InputField
