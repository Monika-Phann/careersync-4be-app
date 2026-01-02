export const CreateTimeSlotModalStyles = {
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
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      '& fieldset': {
        borderColor: '#E0E0E0',
      },
      '&:hover fieldset': {
        borderColor: '#BDBDBD',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#155DFC',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#666666',
      fontSize: '14px',
      backgroundColor: '#ffffff',
      padding: '0 6px',
      '&.Mui-focused': {
        color: '#155DFC',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px 14px',
      fontSize: '14px',
      color: '#030C2B',
    },
  },
  dialogActions: {
    padding: '16px 24px 24px 24px',
    gap: '12px',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    textTransform: 'none',
    borderRadius: '8px',
    borderColor: '#E0E0E0',
    color: '#666666',
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: 500,
    '&:hover': {
      borderColor: '#BDBDBD',
      backgroundColor: '#F5F5F5',
    },
  },
  saveButton: {
    textTransform: 'none',
    borderRadius: '8px',
    backgroundColor: '#155DFC',
    color: '#ffffff',
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#1248d4',
    },
  },
}

