export const SettingsTabSwitcherStyles = {
  container: {
    display: 'flex',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '4px',
    gap: '4px',
    width: 'fit-content',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  tabActive: {
    backgroundColor: '#CDEEFF',
    '&:hover': {
      backgroundColor: '#CDEEFF',
    },
  },
  icon: {
    fontSize: '20px',
    color: '#666666',
  },
  iconActive: {
    color: '#030C2B',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#666666',
  },
  labelActive: {
    color: '#030C2B',
    fontWeight: 600,
  },
}

