export const QuickStatsStyles = {
  card: {
    borderRadius: '12px',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
    height: '100%',
  },
  content: {
    padding: '24px',
  },
  title: {
    fontWeight: 600,
    fontSize: '18px',
    color: '#333333',
    marginBottom: '24px',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  statHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    fontSize: '20px',
    color: '#4caf50',
  },
  statLabel: {
    color: '#666666',
    fontSize: '14px',
  },
  statValue: {
    fontWeight: 700,
    color: '#333333',
    fontSize: '24px',
  },
  progress: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#4caf50',
    },
  },
  statNote: {
    color: '#999999',
    fontSize: '12px',
  },
}

