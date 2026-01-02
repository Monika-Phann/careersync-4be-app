import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@keyframes csSlideUpFade': {
          from: { opacity: 0, transform: 'translate3d(0, 8px, 0)' },
          to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
            scrollBehavior: 'auto !important',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 200ms ease, box-shadow 200ms ease',
          '@media (hover: hover)': {
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0px 10px 24px rgba(0,0,0,0.08)',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'transform 180ms ease, background-color 180ms ease, border-color 180ms ease',
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform 180ms ease, background-color 180ms ease',
          '&:active': {
            transform: 'scale(0.97)',
          },
        },
      },
    },
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.05)',
    '0px 8px 16px rgba(0,0,0,0.05)',
    '0px 12px 24px rgba(0,0,0,0.05)',
    '0px 16px 32px rgba(0,0,0,0.05)',
    '0px 20px 40px rgba(0,0,0,0.05)',
    '0px 24px 48px rgba(0,0,0,0.05)',
    '0px 28px 56px rgba(0,0,0,0.05)',
    '0px 32px 64px rgba(0,0,0,0.05)',
    '0px 36px 72px rgba(0,0,0,0.05)',
    '0px 40px 80px rgba(0,0,0,0.05)',
    '0px 44px 88px rgba(0,0,0,0.05)',
    '0px 48px 96px rgba(0,0,0,0.05)',
    '0px 52px 104px rgba(0,0,0,0.05)',
    '0px 56px 112px rgba(0,0,0,0.05)',
    '0px 60px 120px rgba(0,0,0,0.05)',
    '0px 64px 128px rgba(0,0,0,0.05)',
    '0px 68px 136px rgba(0,0,0,0.05)',
    '0px 72px 144px rgba(0,0,0,0.05)',
    '0px 76px 152px rgba(0,0,0,0.05)',
    '0px 80px 160px rgba(0,0,0,0.05)',
    '0px 84px 168px rgba(0,0,0,0.05)',
    '0px 88px 176px rgba(0,0,0,0.05)',
  ],
})

// Suppress React DevTools message and sensitive data logging
if (typeof window !== 'undefined') {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  // Override console.log to filter sensitive data
  console.log = (...args) => {
    // Suppress React DevTools message
    if (args[0] && typeof args[0] === 'string' && args[0].includes('Download the React DevTools')) {
      return;
    }
    // Suppress any logs containing sensitive user data patterns
    const stringified = JSON.stringify(args);
    if (stringified && (
      stringified.includes('"password"') ||
      stringified.includes('"refresh_token"') ||
      stringified.includes('"AccUser"') ||
      stringified.includes('"Mentor"') ||
      stringified.includes('"Admin"') ||
      stringified.includes('user_id') ||
      stringified.includes('userResponse') ||
      (stringified.includes('"id"') && stringified.includes('"email"') && stringified.includes('"role_name"'))
    )) {
      return; // Don't log sensitive user data
    }
    originalConsoleLog.apply(console, args);
  };
  
  // Override console.error to filter sensitive data
  console.error = (...args) => {
    const stringified = JSON.stringify(args);
    if (stringified && (
      stringified.includes('"password"') ||
      stringified.includes('"refresh_token"') ||
      stringified.includes('userResponse') ||
      (stringified.includes('"id"') && stringified.includes('"email"') && stringified.includes('"role_name"'))
    )) {
      return; // Don't log sensitive user data
    }
    originalConsoleError.apply(console, args);
  };
  
  // Override console.warn to filter sensitive data
  console.warn = (...args) => {
    const stringified = JSON.stringify(args);
    if (stringified && (
      stringified.includes('"password"') ||
      stringified.includes('"refresh_token"') ||
      stringified.includes('userResponse')
    )) {
      return; // Don't log sensitive user data
    }
    originalConsoleWarn.apply(console, args);
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)

