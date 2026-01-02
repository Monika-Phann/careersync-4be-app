import { LogoContainer, LogoImg } from './Logo.styles'

function Logo({ className = '', style = {} }) {
  return (
    <LogoContainer className={className} style={style}>
      <LogoImg src="/careersyncLogo.svg" alt="CareerSync" />
    </LogoContainer>
  )
}

export default Logo

