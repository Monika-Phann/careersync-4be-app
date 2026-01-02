export const UpdateScheduleModalStyles = {
  dialogPaper: {
    borderRadius: '12px',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 24px 16px',
  },
  title: {
    fontWeight: 600,
    color: '#030C2B',
  },
  closeButton: {
    color: '#666666',
  },
  dialogContent: {
    padding: '0 24px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    paddingTop: '8px',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
  },
  timeSlotsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  timeSlotsTitle: {
    fontWeight: 600,
    color: '#030C2B',
    marginBottom: '8px',
  },
  timeSlotItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  timeSlotChip: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
  },
  deleteButton: {
    color: '#d32f2f',
    '&:hover': {
      backgroundColor: '#ffebee',
    },
  },
  addButton: {
    textTransform: 'none',
    borderRadius: '8px',
    alignSelf: 'flex-start',
  },
  dialogActions: {
    padding: '16px 24px 24px',
    gap: '12px',
  },
  cancelButton: {
    textTransform: 'none',
    borderRadius: '8px',
    color: '#666666',
    borderColor: '#e0e0e0',
  },
  saveButton: {
    textTransform: 'none',
    borderRadius: '8px',
    backgroundColor: '#030C2B',
    '&:hover': {
      backgroundColor: '#1a1a2e',
    },
  },
}

