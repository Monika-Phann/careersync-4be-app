export const UserDetailsModalStyles = {
  dialogPaper: {
    borderRadius: '12px',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '24px 24px 16px',
    borderBottom: '1px solid #E0E0E0',
  },
  dialogTitleRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  topRightStatusChip: {
    height: '20px',
    fontSize: '11px',
    fontWeight: 600,
    borderRadius: '12px',
    '& .MuiChip-label': {
      padding: '0 10px',
    },
  },
  title: {
    fontWeight: 600,
    color: '#030C2B',
    marginBottom: '4px',
  },
  subtitle: {
    color: '#666666',
    fontSize: '12px',
  },
  closeButton: {
    color: '#666666',
  },
  dialogContent: {
    padding: '24px',
  },
  userHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '18px',
  },
  avatar: {
    width: 60,
    height: 60,
    fontSize: '24px',
    fontWeight: 600,
    backgroundColor: '#E5E7EB',
    color: '#030C2B',
  },
  userName: {
    fontWeight: 600,
    color: '#030C2B',
    marginBottom: '4px',
    fontSize: '16px',
  },
  userEmail: {
    color: '#666666',
    fontSize: '12px',
  },
  roleChipInline: {
    marginTop: '6px',
    height: '18px',
    fontSize: '11px',
    fontWeight: 600,
    borderRadius: '12px',
    backgroundColor: '#E3F2FD',
    color: '#155DFC',
    '& .MuiChip-label': {
      padding: '0 8px',
    },
  },
  section: {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #E0E0E0',
  },
  sectionTitle: {
    fontWeight: 600,
    color: '#030C2B',
    marginBottom: '16px',
    fontSize: '14px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  infoLabel: {
    color: '#666666',
    fontSize: '12px',
    fontWeight: 500,
  },
  infoValue: {
    color: '#030C2B',
    fontSize: '14px',
    fontWeight: 500,
  },
  dialogActions: {
    padding: '16px 24px 24px',
    gap: '12px',
    justifyContent: 'space-between',
  },
  acceptButton: {
    textTransform: 'none',
    borderRadius: '8px',
    backgroundColor: '#BFE6FF',
    color: '#030C2B',
    boxShadow: 'none',
    border: '1px solid #90CAF9',
    flex: 1,
    height: '44px',
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
    flex: 1,
    height: '44px',
    '&:hover': {
      backgroundColor: '#1a1a2e',
      boxShadow: 'none',
    },
  },
}

