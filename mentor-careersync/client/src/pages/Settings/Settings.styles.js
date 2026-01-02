export const SettingsStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  headerSection: {
    marginBottom: '8px',
  },
  pageTitle: {
    fontWeight: 600,
    fontSize: '32px',
    color: '#030C2B',
    marginBottom: '4px',
  },
  pageSubtitle: {
    color: '#666666',
    fontSize: '16px',
  },
  card: {
    borderRadius: '12px',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
  },
  cardContent: {
    padding: '24px',
  },
  tabsContainer: {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
  contentContainer: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '400px',
  },
  tabContent: {
    width: '100%',
  },
  tabs: {
    '& .MuiTab-root': {
      textTransform: 'none',
      minHeight: '48px',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: 500,
      color: '#666666',
      borderRadius: '8px 8px 0 0',
      marginRight: '4px',
      '&.Mui-selected': {
        color: '#030C2B',
        fontWeight: 600,
        backgroundColor: '#E3F2FD',
      },
    },
    '& .MuiTabs-indicator': {
      display: 'none',
    },
  },
  tab: {
    '& .MuiSvgIcon-root': {
      marginRight: '8px',
      fontSize: '20px',
    },
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: '20px',
    color: '#030C2B',
    marginBottom: '4px',
  },
  sectionSubtitle: {
    color: '#666666',
    fontSize: '14px',
  },
  editButton: {
    textTransform: 'none',
    borderRadius: '8px',
    backgroundColor: '#030C2B',
    color: '#ffffff',
    padding: '10px 24px',
    '&:hover': {
      backgroundColor: '#020a1f',
    },
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid #e0e0e0',
  },
  profileEditSection: {
    marginBottom: '32px',
  },
  profilePictureSection: {
    marginBottom: '24px',
  },
  profilePictureContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '12px',
  },
  avatarWrapper: {
    position: 'relative',
    display: 'inline-block',
    width: 'fit-content',
  },
  profileAvatar: {
    width: 120,
    height: 120,
    fontSize: '48px',
    fontWeight: 600,
    backgroundColor: '#030C2B',
    color: '#ffffff',
  },
  profileInfo: {
    flex: 1,
  },
  profileLabel: {
    fontWeight: 500,
    color: '#030C2B',
    marginBottom: '4px',
  },
  profileSubtext: {
    color: '#666666',
    fontSize: '14px',
  },
  cameraButton: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    backgroundColor: '#ffffff',
    border: '2px solid #e0e0e0',
    width: '36px',
    height: '36px',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '20px',
      color: '#666666',
    },
  },
  uploadButton: {
    textTransform: 'none',
    borderRadius: '8px',
    borderColor: '#e0e0e0',
    color: '#666666',
    padding: '10px 24px',
    width: 'fit-content',
    '&:hover': {
      borderColor: '#bdbdbd',
      backgroundColor: '#f5f5f5',
    },
  },
  uploadHint: {
    color: '#999999',
    fontSize: '12px',
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '24px',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '&.Mui-disabled': {
        backgroundColor: '#f5f5f5',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#e0e0e0',
        },
      },
    },
    '& .MuiInputLabel-root.Mui-disabled': {
      color: '#999999',
    },
  },
  inputIcon: {
    color: '#666666',
    fontSize: '20px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px',
  },
  cancelButton: {
    textTransform: 'none',
    borderRadius: '8px',
    color: '#666666',
    borderColor: '#e0e0e0',
    padding: '10px 24px',
    '&:hover': {
      borderColor: '#bdbdbd',
      backgroundColor: '#f5f5f5',
    },
  },
  saveButton: {
    textTransform: 'none',
    borderRadius: '8px',
    backgroundColor: '#030C2B',
    color: '#ffffff',
    padding: '10px 24px',
    '&:hover': {
      backgroundColor: '#020a1f',
    },
  },
  updateButton: {
    textTransform: 'none',
    borderRadius: '8px',
    backgroundColor: '#030C2B',
    color: '#ffffff',
    padding: '10px 24px',
    '&:hover': {
      backgroundColor: '#020a1f',
    },
  },
  securityHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '32px',
  },
  securityIcon: {
    fontSize: '48px',
    color: '#42a5f5',
    marginTop: '4px',
  },
  passwordSection: {
    marginBottom: '24px',
  },
  passwordSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  keyIcon: {
    fontSize: '24px',
    color: '#666666',
  },
  passwordTitle: {
    fontWeight: 600,
    fontSize: '18px',
    color: '#030C2B',
  },
  passwordRequirements: {
    marginTop: '24px',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  requirementsTitle: {
    fontWeight: 600,
    color: '#030C2B',
    marginBottom: '12px',
  },
  requirementsList: {
    padding: 0,
  },
  bulletIcon: {
    minWidth: '24px',
  },
  bullet: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#666666',
  },
  requirementText: {
    '& .MuiListItemText-primary': {
      fontSize: '14px',
      color: '#666666',
    },
  },
}

