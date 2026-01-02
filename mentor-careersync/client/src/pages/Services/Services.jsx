import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  School,
  Work,
  Assessment,
  Description,
} from '@mui/icons-material'
import { ServicesStyles } from './Services.styles'

const services = [
  {
    title: 'Career Consultation',
    icon: <Work />,
    description: 'One-on-one career guidance sessions with experienced mentors.',
    features: [
      'Personalized career path planning',
      'Industry insights and trends',
      'Resume and portfolio review',
    ],
  },
  {
    title: 'Interview Preparation',
    icon: <Assessment />,
    description: 'Comprehensive interview preparation and mock interview sessions.',
    features: [
      'Mock interview practice',
      'Common interview questions',
      'Feedback and improvement tips',
    ],
  },
  {
    title: 'Material Review',
    icon: <Description />,
    description: 'Review and feedback on your work materials and projects.',
    features: [
      'Code review for developers',
      'Portfolio assessment',
      'Documentation review',
    ],
  },
  {
    title: 'Certification Programs',
    icon: <School />,
    description: 'Structured certification programs with job shadowing opportunities.',
    features: [
      'Hands-on experience',
      'Industry-recognized certificates',
      'Progress tracking',
    ],
  },
]

function Services() {
  return (
    <Box sx={ServicesStyles.container}>
      <Typography variant="h4" sx={ServicesStyles.title}>
        Our Services
      </Typography>
      <Typography variant="body1" sx={ServicesStyles.subtitle}>
        Explore our comprehensive mentoring services designed to accelerate your
        career growth.
      </Typography>
      <Grid container spacing={3} sx={ServicesStyles.grid}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Card sx={ServicesStyles.card}>
              <CardContent sx={ServicesStyles.content}>
                <Box sx={ServicesStyles.iconContainer}>
                  {service.icon}
                </Box>
                <Typography variant="h6" sx={ServicesStyles.serviceTitle}>
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={ServicesStyles.description}>
                  {service.description}
                </Typography>
                <List sx={ServicesStyles.list}>
                  {service.features.map((feature, idx) => (
                    <ListItem key={idx} sx={ServicesStyles.listItem}>
                      <ListItemIcon sx={ServicesStyles.listIcon}>
                        <Box sx={ServicesStyles.bullet} />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        sx={ServicesStyles.listText}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Services

