export const BookingTableStyles = {
  card: {
    borderRadius: '12px',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
  },
  content: {
    padding: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    fontWeight: 600,
    fontSize: '18px',
    color: '#030C2B',
  },
  exportButton: {
    textTransform: 'none',
    borderRadius: '8px',
  },
  toolbar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  searchField: {
    flex: 1,
    minWidth: '200px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
  },
  searchIcon: {
    color: '#666666',
  },
  filters: {
    display: 'flex',
    gap: '8px',
  },
  filterButton: {
    textTransform: 'none',
    borderRadius: '8px',
  },
  headerCell: {
    fontWeight: 600,
    color: '#030C2B',
    fontSize: '14px',
    borderBottom: '2px solid #e0e0e0',
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#f9f9f9',
    },
  },
  bookingId: {
    fontWeight: 500,
    color: '#030C2B',
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
    color: '#030C2B',
  },
  userEmail: {
    color: '#666666',
    fontSize: '12px',
  },
  amount: {
    fontWeight: 600,
    color: '#030C2B',
  },
  dateTimeCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  dateText: {
    color: '#030C2B',
    fontWeight: 500,
  },
  timeText: {
    color: '#666666',
    fontSize: '12px',
  },
  statusChip: {
    fontWeight: 600,
    fontSize: '12px',
    height: '24px',
    borderRadius: '12px',
  },
  actionsCell: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  approvalCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    alignItems: 'flex-start',
  },
  acceptButton: {
    textTransform: 'none',
    borderRadius: '8px',
    backgroundColor: '#BFE6FF',
    color: '#030C2B',
    boxShadow: 'none',
    border: '1px solid #90CAF9',
    padding: '2px 10px',
    minWidth: '72px',
    height: '24px',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: '#A8DCFF',
      boxShadow: 'none',
    },
  },
  rejectButton: {
    textTransform: 'none',
    borderRadius: '8px',
    backgroundColor: '#030C2B',
    color: '#ffffff',
    boxShadow: 'none',
    padding: '2px 10px',
    minWidth: '72px',
    height: '24px',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: '#1a1a2e',
      boxShadow: 'none',
    },
  },
  viewButton: {
    textTransform: 'none',
    borderRadius: '6px',
    borderColor: '#155DFC',
    color: '#155DFC',
    padding: '2px 12px',
    height: '28px',
    fontSize: '12px',
    minWidth: '64px',
    '&:hover': {
      borderColor: '#1248d4',
      backgroundColor: '#F3F7FF',
    },
  },
  moreButton: {
    color: '#666666',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '24px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  paginationText: {
    color: '#666666',
  },
}

