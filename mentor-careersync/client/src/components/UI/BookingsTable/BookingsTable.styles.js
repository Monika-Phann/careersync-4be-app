export const BookingsTableStyles = {
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
    marginBottom: '20px',
  },
  headerCell: {
    fontWeight: 600,
    color: '#666666',
    fontSize: '14px',
    borderBottom: '2px solid #e0e0e0',
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#f9f9f9',
    },
  },
  userCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: 40,
    height: 40,
    fontSize: '14px',
    fontWeight: 600,
  },
  userName: {
    fontWeight: 500,
    color: '#333333',
  },
  userEmail: {
    color: '#666666',
    fontSize: '12px',
  },
  statusChip: {
    fontWeight: 600,
    fontSize: '12px',
    height: '24px',
  },
}

