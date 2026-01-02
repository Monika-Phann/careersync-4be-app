import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#05173a', // navy
      dark: '#031027',
      light: '#0e2d5a',
    },
    secondary: {
      main: '#0c3c82',
      light: '#e0efff',
      dark: '#0a5fb8',
    },
    background: {
      default: '#f5f7fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    },
    grey: {
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
    },
    divider: '#e5e7eb',
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontSize: 'clamp(28px, 5vw, 42px)',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '36px',
      fontWeight: 700,
      '@media (max-width: 900px)': {
        fontSize: '28px',
      },
    },
    h3: {
      fontSize: '24px',
      fontWeight: 600,
    },
    h4: {
      fontSize: '18px',
      fontWeight: 600,
    },
    body1: {
      fontSize: '14px',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '13px',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0 10px 40px rgba(0, 30, 71, 0.08)',
    '0 2px 4px rgba(0, 30, 71, 0.1)',
    ...Array(22).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
          padding: '12px 18px',
          boxShadow: '0 10px 40px rgba(0, 30, 71, 0.08)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 40px rgba(0, 30, 71, 0.12)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid #e5e7eb',
          boxShadow: '0 10px 40px rgba(0, 30, 71, 0.08)',
        },
      },
    },
  },
})

export default theme

