export const SessionScheduleStyles = {
  container: {
    padding: 0,
  },
  summaryCards: {
    marginBottom: '32px',
  },
  summaryCard: {
    borderRadius: '12px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    backgroundColor: '#ffffff',
  },
  summaryCardContent: {
    padding: '24px',
    '&:last-child': {
      paddingBottom: '24px',
    },
  },
  summaryContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px',
  },
  summaryTopRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  summaryIcon: {
    width: '32px',
    height: '32px',
    objectFit: 'contain',
    flexShrink: 0,
  },
  summaryValue: {
    fontWeight: 600,
    fontSize: '28px',
    color: '#030C2B',
    lineHeight: 1.2,
    marginTop: '4px',
  },
  summaryLabel: {
    color: '#666666',
    fontSize: '14px',
  },
  filterSortSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '24px',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: '#ffffff',
    border: '1px solid #EAEAEA',
    borderRadius: '12px',
    padding: '12px 16px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  filterLabelContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  filterIcon: {
    color: '#666666',
    fontSize: '18px',
  },
  filterLabel: {
    color: '#666666',
    fontSize: '14px',
    fontWeight: 500,
  },
  filterButton: {
    textTransform: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 500,
    minWidth: 'auto',
    '&.MuiButton-contained': {
      backgroundColor: '#155DFC',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#1248d4',
      },
    },
    '&.MuiButton-outlined': {
      borderColor: '#E0E0E0',
      color: '#666666',
      '&:hover': {
        borderColor: '#BDBDBD',
        backgroundColor: '#F5F5F5',
      },
    },
  },
  viewAllButton: {
    textTransform: 'none',
    borderRadius: '8px',
    backgroundColor: '#155DFC',
    color: '#ffffff',
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: 500,
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: '#1248d4',
    },
  },
  sessionCard: {
    borderRadius: '12px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    height: '320px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
    },
  },
  sessionCardContent: {
    padding: '20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:last-child': {
      paddingBottom: '20px',
    },
  },
  sessionCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  statusChip: {
    fontWeight: 600,
    fontSize: '12px',
    height: '24px',
    borderRadius: '50px',
    '& .MuiChip-label': {
      padding: '0 8px',
    },
  },
  sessionPrice: {
    fontWeight: 600,
    fontSize: '18px',
    color: '#4CAF50',
  },
  sessionDate: {
    fontWeight: 600,
    fontSize: '16px',
    color: '#030C2B',
    marginBottom: '8px',
  },
  sessionDuration: {
    color: '#666666',
    fontSize: '14px',
    marginBottom: '8px',
  },
  sessionTime: {
    color: '#030C2B',
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '12px',
  },
  sessionLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '16px',
  },
  locationIcon: {
    color: '#666666',
    fontSize: '18px',
  },
  locationText: {
    color: '#666666',
    fontSize: '14px',
  },
  bookedBySection: {
    paddingTop: '16px',
    borderTop: '1px solid #E0E0E0',
    marginTop: 'auto',
  },
  bookedByLabel: {
    color: '#666666',
    fontSize: '12px',
    marginBottom: '4px',
  },
  bookedByName: {
    color: '#030C2B',
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '2px',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },
  bookedByEmail: {
    color: '#666666',
    fontSize: '12px',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },
}

