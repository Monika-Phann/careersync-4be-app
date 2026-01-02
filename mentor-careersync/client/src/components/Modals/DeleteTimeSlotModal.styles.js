export const DeleteTimeSlotModalStyles = {
  dialogPaper: {
    borderRadius: '12px',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
    overflow: 'visible',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 24px 16px 24px',
    borderBottom: '1px solid #E0E0E0',
  },
  title: {
    fontWeight: 600,
    fontSize: '20px',
    color: '#030C2B',
  },
  closeButton: {
    color: '#666666',
    padding: '4px',
    '&:hover': {
      backgroundColor: '#F5F5F5',
    },
  },
  dialogContent: {
    padding: '24px',
    paddingTop: '28px',
    overflow: 'visible',
  },
  warningText: {
    color: '#999999',
    fontSize: '12px',
    marginBottom: '12px',
  },
  questionText: {
    color: '#030C2B',
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '16px',
  },
  timeSlotInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#F8FAFC',
    border: '1px solid #EAEAEA',
    borderRadius: '12px',
    marginBottom: '18px',
  },
  timeIcon: {
    color: '#666666',
    fontSize: '22px',
  },
  timeSlotDate: {
    fontWeight: 600,
    fontSize: '16px',
    color: '#030C2B',
    marginBottom: '4px',
  },
  timeSlotTime: {
    color: '#666666',
    fontSize: '14px',
  },
  warningAlert: {
    borderRadius: '12px',
    backgroundColor: '#FFF3E0',
    border: '1px solid #FFB74D',
    '& .MuiAlert-icon': {
      color: '#FF9800',
    },
    '& .MuiAlert-message': {
      color: '#E65100',
      fontSize: '14px',
    },
  },
  dialogActions: {
    padding: '16px 24px 24px 24px',
    gap: '16px',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    textTransform: 'none',
    borderRadius: '10px',
    borderColor: '#E0E0E0',
    color: '#666666',
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: 500,
    minWidth: '140px',
    height: '44px',
    '&:hover': {
      borderColor: '#BDBDBD',
      backgroundColor: '#F5F5F5',
    },
  },
  deleteButton: {
    textTransform: 'none',
    borderRadius: '10px',
    backgroundColor: '#F44336',
    color: '#ffffff',
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: 500,
    minWidth: '190px',
    height: '44px',
    '&:hover': {
      backgroundColor: '#D32F2F',
    },
  },
}

