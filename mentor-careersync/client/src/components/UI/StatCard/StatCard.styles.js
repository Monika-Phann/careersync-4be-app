export const StatCardStyles = {
  card: {
    borderRadius: '12px',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0px 4px 16px rgba(0,0,0,0.12)',
    },
  },
  content: {
    padding: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon: {
    width: '48px',
    height: '48px',
    display: 'block',
  },
  value: {
    fontWeight: 700,
    fontSize: '32px',
    color: '#333333',
    marginBottom: '8px',
  },
  title: {
    color: '#666666',
    fontSize: '14px',
    marginBottom: '12px',
  },
  changeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  trendIcon: {
    fontSize: '16px',
    color: '#4caf50',
  },
  change: {
    color: '#4caf50',
    fontWeight: 600,
    fontSize: '14px',
  },
}

