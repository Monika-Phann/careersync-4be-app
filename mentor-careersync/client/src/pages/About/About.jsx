import React from 'react'
import { Box, Typography, Card, CardContent, Grid } from '@mui/material'
import { AboutStyles } from './About.styles'

function About() {
  return (
    <Box sx={AboutStyles.container}>
      <Card sx={AboutStyles.card}>
        <CardContent sx={AboutStyles.content}>
          <Typography variant="h4" sx={AboutStyles.title}>
            About CAREERSONC
          </Typography>
          <Typography variant="body1" sx={AboutStyles.description}>
            CAREERSONC is a modern mentoring platform designed to connect mentors
            with mentees, facilitating career growth and professional development.
            Our platform provides a comprehensive solution for managing mentoring
            sessions, tracking progress, and delivering certifications.
          </Typography>
          <Grid container spacing={3} sx={AboutStyles.grid}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={AboutStyles.sectionTitle}>
                Our Mission
              </Typography>
              <Typography variant="body2" sx={AboutStyles.text}>
                To empower individuals in their career journeys by providing
                access to experienced mentors and structured learning programs.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={AboutStyles.sectionTitle}>
                Our Vision
              </Typography>
              <Typography variant="body2" sx={AboutStyles.text}>
                To become the leading platform for career mentorship and
                professional development, helping thousands of professionals
                achieve their career goals.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default About

