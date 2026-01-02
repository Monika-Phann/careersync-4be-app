import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
} from '@mui/material'
import { Close as CloseIcon, AccessTime as AccessTimeIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material'
import { SessionAgendaModalStyles } from './SessionAgendaModal.styles'

const agendaItems = [
  {
    title: 'Welcome + What Does a Data Analyst Do?',
    time: '9:00 - 9:30 AM',
    details: [
      'Introductions',
      'Overview of job responsibilities',
      'Student Q&A',
    ],
    color: '#9c27b0',
  },
  {
    title: 'Explore the Dataset',
    time: '9:30 - 10:30 AM',
    details: [
      'Open public/fake dataset',
      'Identify rows, columns, data types',
      'Mini task: Find 3 interesting data points',
    ],
    color: '#2196f3',
  },
  {
    title: 'Data Cleaning Basics',
    time: '10:30 - 11:30 AM',
    details: [
      'Removing duplicates',
      'Fixing missing values',
      'Normalizing categories',
      'Quick challenge activity',
    ],
    color: '#4caf50',
  },
  {
    title: 'Lunch Break + Career Chat',
    time: '11:30 - 12:30 PM',
    details: [
      'Discuss education paths',
      'Salaries',
      'Tools',
      'Daily work',
    ],
    color: '#ff9800',
  },
  {
    title: 'Data Visualization',
    time: '12:30 - 1:45 PM',
    details: [
      'Create charts (bar, pie, line)',
      'Mini challenge: Visualize a trend',
    ],
    color: '#e91e63',
  },
  {
    title: 'Build a Mini Dashboard',
    time: '1:45 - 2:45 PM',
    details: [
      'Combine charts',
      'Add simple KPIs',
      'Create a one-page dashboard',
    ],
    color: '#00bcd4',
  },
  {
    title: 'Final Presentation + Wrap-Up',
    time: '2:45 - 3:00 PM',
    details: [
      'Students share dashboards',
      'Feedback and reflections',
    ],
    color: '#009688',
  },
]

function SessionAgendaModal({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: SessionAgendaModalStyles.dialogPaper,
      }}
    >
      <DialogTitle sx={SessionAgendaModalStyles.dialogTitle}>
        <Box sx={SessionAgendaModalStyles.titleContainer}>
          <Typography variant="h4" sx={SessionAgendaModalStyles.title}>
            DATA ANALYST SHADOWING AGENDA
          </Typography>
          <Box sx={SessionAgendaModalStyles.durationContainer}>
            <AccessTimeIcon sx={SessionAgendaModalStyles.durationIcon} />
            <Typography variant="body1" sx={SessionAgendaModalStyles.duration}>
              6 Hours Total
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          sx={SessionAgendaModalStyles.closeButton}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={SessionAgendaModalStyles.dialogContent}>
        <Box sx={SessionAgendaModalStyles.agendaContainer}>
          {agendaItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                ...SessionAgendaModalStyles.agendaItem,
                borderLeft: `4px solid ${item.color}`,
                backgroundColor: `${item.color}08`,
              }}
            >
              <Box sx={SessionAgendaModalStyles.agendaHeader}>
                <Typography variant="h6" sx={SessionAgendaModalStyles.agendaTitle}>
                  {item.title}
                </Typography>
                <Box sx={SessionAgendaModalStyles.agendaMeta}>
                  <Chip
                    label={item.time}
                    size="small"
                    sx={SessionAgendaModalStyles.timeChip}
                  />
                  <IconButton size="small" sx={SessionAgendaModalStyles.linkButton}>
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <Box component="ul" sx={SessionAgendaModalStyles.agendaDetails}>
                {item.details.map((detail, detailIndex) => (
                  <li key={detailIndex}>
                    <Typography variant="body2">{detail}</Typography>
                  </li>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Typography variant="body2" sx={SessionAgendaModalStyles.footerText}>
          This hands-on shadowing experience will give you a real taste of what data analysts do daily.
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default SessionAgendaModal

