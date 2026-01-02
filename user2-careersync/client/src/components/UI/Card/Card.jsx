import { StyledCard } from './Card.styles'

function Card({ children, className, ...rest }) {
  return (
    <StyledCard className={className} {...rest}>
      {children}
    </StyledCard>
  )
}

export default Card

