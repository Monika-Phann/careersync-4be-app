import { Container, Typography, Box } from '@mui/material'
import SectionHeading from '../../components/UI/SectionHeading/SectionHeading'
import Card from '../../components/UI/Card/Card'
import { team } from '../../data/content'
import { motion } from 'framer-motion'
import {
  Section,
  AboutLead,
  TeamGrid,
  TeamCardContent,
  TeamMemberImage,
  BioCard,
  BioImage,
  BioGrid,
} from './About.styles'

function About() {
  return (
    <Section
  component={motion.div}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
      <Container maxWidth="lg">
        <SectionHeading title="About Us" />
        <AboutLead>
          <Typography variant="h3" component="h3" sx={{ color: '#0f172a', marginBottom: 1 }}>
            Our Vision
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Our vision is to revolutionize the career exploration landscape in Cambodia by becoming the leading
            digital platform for students, fostering a professional ecosystem where every student, regardless of
            location, has the tools and resources to thrive.
          </Typography>
          <Typography variant="h3" component="h3" sx={{ color: '#0f172a', margin: '22px 0 8px' }}>
            Our Mission
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Our mission is to empower students across Cambodia by providing seamless access to shadowing
            opportunities, enabling them to make informed decisions about their futures.
          </Typography>
        </AboutLead>

        <SectionHeading title="Meet Our Team" subtitle="The people creating better pathways for students." />
        <TeamGrid>
          {team.map((member) => (
            <Card key={member.name}>
              <TeamCardContent>
                <TeamMemberImage src={member.photo} alt={member.name} />
                <Typography variant="h4" component="h4" sx={{ margin: '12px 0 2px' }}>
                  {member.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ margin: 0 }}>
                  {member.role}
                </Typography>
              </TeamCardContent>
            </Card>
          ))}
        </TeamGrid>

        <BioGrid>
          {team.map((member, index) => (
            <BioCard key={`${member.name}-bio`} white={index % 2 === 1}>
              <BioImage src={member.photo} alt={member.name} />
              <Box>
                <Typography variant="h4" component="h4">
                  {member.name}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, margin: '0 0 8px' }}>
                  {member.role}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {member.longBio}
                </Typography>
              </Box>
            </BioCard>
          ))}
        </BioGrid>
      </Container>
    </Section>
  )
}

export default About

