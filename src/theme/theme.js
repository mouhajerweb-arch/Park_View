'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F6F2EC', // Luxury warm stone beige matching brochure
      paper: '#FAF7F3',
    },
    primary: {
      main: '#2B2825', // Dark charcoal slate
      contrastText: '#F6F2EC',
    },
    secondary: {
      main: '#5A7365', // Sage green accent matching map pin
    },
    text: {
      primary: '#2B2825',
      secondary: '#6E6862',
    },
  },
  typography: {
    fontFamily: '"Silka", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"CS Brandis", serif',
      fontWeight: 'normal',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"CS Brandis", serif',
      fontWeight: 'normal',
      letterSpacing: '-0.015em',
    },
    h3: {
      fontFamily: '"CS Brandis", serif',
      fontWeight: 'normal',
    },
    h4: {
      fontFamily: '"CS Brandis", serif',
      fontWeight: 'normal',
    },
    h5: {
      fontFamily: '"CS Brandis", serif',
      fontWeight: 'normal',
    },
    h6: {
      fontFamily: '"CS Brandis", serif',
      fontWeight: 'normal',
    },
    body1: {
      fontFamily: '"Silka", sans-serif',
      fontSize: '1.05rem',
      lineHeight: 1.75,
      color: '#5C5752',
    },
    body2: {
      fontFamily: '"Silka", sans-serif',
    },
    button: {
      fontFamily: '"Guise", sans-serif',
      fontWeight: 500,
    }
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"Guise", sans-serif',
          fontWeight: 500,
          borderRadius: 30,
          padding: '8px 24px',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: '"Guise", sans-serif',
          textDecoration: 'none',
        }
      }
    }
  },
});

export default theme;
