import { Link } from 'react-router-dom'
import { StyledButton } from './Button.styles'

function Button({ to, children, variant = 'primary', full = false, className, ...rest }) {
  const props = {
    variant,
    fullwidth: full ? 'true' : 'false',
    className,
    ...rest,
  }

  if (to) {
    return (
      <StyledButton component={Link} to={to} {...props}>
        {children}
      </StyledButton>
    )
  }

  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  )
}

export default Button

