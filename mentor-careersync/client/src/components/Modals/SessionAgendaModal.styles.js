export const SessionAgendaModalStyles = {
  dialogPaper: {
    borderRadius: '12px',
    maxHeight: '90vh',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '24px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  title: {
    fontWeight: 700,
    color: '#030C2B',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  durationContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  durationIcon: {
    color: '#666666',
    fontSize: '20px',
  },
  duration: {
    color: '#666666',
    fontWeight: 500,
  },
  closeButton: {
    color: '#666666',
  },
  dialogContent: {
    padding: '24px',
    backgroundColor: '#ffffff',
  },
  agendaContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px',
  },
  agendaItem: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  agendaHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  agendaTitle: {
    fontWeight: 600,
    color: '#030C2B',
    flex: 1,
  },
  agendaMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  timeChip: {
    backgroundColor: '#f5f5f5',
    fontWeight: 500,
  },
  linkButton: {
    color: '#666666',
  },
  agendaDetails: {
    margin: 0,
    paddingLeft: '20px',
    color: '#666666',
    '& li': {
      marginBottom: '8px',
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
  footerText: {
    textAlign: 'center',
    color: '#666666',
    fontStyle: 'italic',
    paddingTop: '16px',
    borderTop: '1px solid #e0e0e0',
  },
}

