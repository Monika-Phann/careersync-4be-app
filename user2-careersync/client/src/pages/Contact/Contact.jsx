import { Container, Typography, Box } from '@mui/material'
import SectionHeading from '../../components/UI/SectionHeading/SectionHeading'
import Card from '../../components/UI/Card/Card'
import { Section, ContactGrid, MapIframe } from './Contact.styles'
import { motion } from 'framer-motion'

function Contact() {
  return (
    <Section
     component={motion.div}
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Container maxWidth="lg">
        <SectionHeading title="Connect with Us" />
        <ContactGrid>
          <Card>
            <Typography variant="h3" component="h3" sx={{ margin: '0 0 10px' }}>
              CareerSync
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ margin: '0 0 12px' }}>
              123 Norodom Boulevard
              <br />
              Phnom Penh, 12301
              <br />
              Cambodia
            </Typography>
            <Typography variant="body1" sx={{ margin: '8px 0', fontWeight: 600 }}>
              Email Address
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ margin: '0 0 12px' }}>
              hello@careersync.com
            </Typography>
            <Typography variant="body1" sx={{ margin: '8px 0', fontWeight: 600 }}>
              Phone Number
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ margin: 0 }}>
              +855 12 345 678
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body1" sx={{ margin: '6px 0', color: '#0f172a' }}>
                LinkedIn: https://www.linkedin.com/company/careersync
              </Typography>
              <Typography variant="body1" sx={{ margin: '6px 0', color: '#0f172a' }}>
                Instagram: https://www.instagram.com/CareerSync
              </Typography>
              <Typography variant="body1" sx={{ margin: '6px 0', color: '#0f172a' }}>
                Twitter: https://twitter.com/CareerSync
              </Typography>
            </Box>
          </Card>
          <Card>
            <MapIframe
              title="Phnom Penh map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15635.94824091656!2d104.909!3d11.5564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951c143e06f85%3A0x894c3c12a7e9cd0!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
              allowFullScreen
              loading="lazy"
            />
          </Card>
        </ContactGrid>
      </Container>
    </Section>
  )
}

export default Contact

