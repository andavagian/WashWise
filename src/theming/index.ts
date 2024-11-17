import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    h4: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '1rem',
    },
    body2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '0.8rem',
    }
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          borderRadius: '8px',
          backgroundColor: '#484848',
          height: '100%',
          zIndex: -999,
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#ffffff',
            fontWeight: 'bold',
          },
          '&:hover': {
            color: '#989898',
            transition: 'all 0.1s ease-in',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: '0',
          '&.Mui-checked': {
            color: '#484848',
          },
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&.Mui-disabled': {
            opacity: 0.3,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#484848',
            color: '#484848',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#484848',
          },
        },
      },
    },

  }
};

const theme = createTheme(themeOptions);
export default theme;
