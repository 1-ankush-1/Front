import { createTheme} from '@mui/material/styles';
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000',
    },
    background: {
      default:'#000',
      paper: '#fff',
    },
    secondary: {
      main: '#fff',
    },
    text: {
      primary: "#000",
    },
    footer:{
      primary:"#000"
    }
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8956F1',
    },
    background: {
      default: '#121212',
      paper: '#000',
    },
    secondary: {
      main: '#fff',
    },
    text: {
      primary: '#fff',
    },
    footer:{
      primary:'#1e1e1e'
    }
  },
});