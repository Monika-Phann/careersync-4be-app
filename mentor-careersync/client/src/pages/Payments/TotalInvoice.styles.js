export const TotalInvoiceStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  card: {
    borderRadius: '12px',
    border: '1px solid #EAEAEA',
    boxShadow: 'none',
  },
  content: {
    padding: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '12px',
  },
  title: {
    fontWeight: 600,
    fontSize: '18px',
    color: '#030C2B',
  },
  downloadAllButton: {
    textTransform: 'none',
    borderRadius: '10px',
    backgroundColor: '#155DFC',
    color: '#ffffff',
    padding: '10px 18px',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#1248d4',
      boxShadow: 'none',
    },
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
      borderRadius: '10px',
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
    borderRadius: '10px',
    borderColor: '#E0E0E0',
    backgroundColor: '#ffffff',
    '&:hover': {
      borderColor: '#BDBDBD',
      backgroundColor: '#F5F5F5',
    },
  },
  headerRow: {
    backgroundColor: '#FAFAFA',
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
  invoiceId: {
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
    backgroundColor: '#1976d2',
  },
  userName: {
    fontWeight: 500,
    color: '#030C2B',
  },
  userEmail: {
    color: '#666666',
    fontSize: '12px',
  },
  bookingId: {
    fontWeight: 500,
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
    fontSize: '14px',
  },
  timeText: {
    color: '#666666',
    fontSize: '12px',
  },
  amount: {
    fontWeight: 600,
    color: '#030C2B',
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
