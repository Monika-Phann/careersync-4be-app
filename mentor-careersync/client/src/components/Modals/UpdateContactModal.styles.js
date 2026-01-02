export const UpdateContactModalStyles = {
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

