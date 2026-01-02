import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material'

function RadioGroupField({ label, name, options = [], required = false, error, helperText, value, onChange, ...rest }) {
  return (
    <FormControl component="fieldset" error={error} fullWidth>
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
      <RadioGroup 
        row 
        name={name} 
        value={value} 
        onChange={onChange} 
        sx={{ columnGap: 2 }} 
        {...rest}
      >
        {options.map((option) => (
          <FormControlLabel 
            key={option.value} 
            value={option.value} 
            control={<Radio size="small" />} 
            label={option.label}
          />
        ))}
      </RadioGroup>
      {helperText && (
        <Typography variant="caption" sx={{ color: error ? '#ef4444' : 'text.secondary', mt: 0.5, display: 'block', fontSize: '12px' }}>
          {helperText}
        </Typography>
      )}
    </FormControl>
  )
}

export default RadioGroupField
