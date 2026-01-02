export const ServicesStyles = {
  container: {
    width: '100%',
  },
  title: {
    fontWeight: 700,
    color: '#333333',
    marginBottom: '12px',
  },
  subtitle: {
    color: '#666666',
    marginBottom: '32px',
    fontSize: '16px',
  },
  grid: {
    marginTop: '16px',
  },
  card: {
    borderRadius: '12px',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
    height: '100%',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0px 4px 16px rgba(0,0,0,0.12)',
    },
  },
  content: {
    padding: '24px',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: '12px',
    backgroundColor: '#e3f2fd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    '& .MuiSvgIcon-root': {
      fontSize: '28px',
      color: '#1976d2',
    },
  },
  serviceTitle: {
    fontWeight: 600,
    color: '#333333',
    marginBottom: '12px',
  },
  description: {
    color: '#666666',
    marginBottom: '16px',
    lineHeight: 1.6,
  },
  list: {
    padding: 0,
  },
  listItem: {
    padding: '8px 0',
  },
  listIcon: {
    minWidth: '32px',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#1976d2',
  },
  listText: {
    '& .MuiListItemText-primary': {
      fontSize: '14px',
      color: '#666666',
    },
  },
}

