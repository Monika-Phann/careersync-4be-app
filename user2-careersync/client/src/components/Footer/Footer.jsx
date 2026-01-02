import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa'
import { StyledFooter, FooterContainer, FooterGrid, FooterSection, SocialRow, SocialButton, FooterNote } from './Footer.styles'
import Logo from '../UI/Logo/Logo'

function Footer() {
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterGrid>
          <FooterSection>
            <Logo style={{ color: '#dce7ff' }} />
            <p style={{ color: '#b9c8e6', marginTop: 10 }}>
              Connecting students with career opportunities through immersive shadowing experiences.
            </p>
          </FooterSection>
          <FooterSection>
            <h4>Programs</h4>
            <p>Information Technology</p>
            <p>Banking & Finance</p>
            <p>Media & Creative</p>
          </FooterSection>
          <FooterSection>
            <h4>Company</h4>
            <p>About Us</p>
            <p>Contact</p>
            <p>Become Mentor</p>
          </FooterSection>
          <FooterSection>
            <h4>Connect</h4>
            <SocialRow>
              <SocialButton>
                <FaFacebookF />
              </SocialButton>
              <SocialButton>
                <FaLinkedinIn />
              </SocialButton>
              <SocialButton>
                <FaInstagram />
              </SocialButton>
              <SocialButton>
                <FaTwitter />
              </SocialButton>
            </SocialRow>
          </FooterSection>
        </FooterGrid>
        <FooterNote>© 2025 CareerSync. All rights reserved.</FooterNote>
      </FooterContainer>
    </StyledFooter>
  )
}

export default Footer

