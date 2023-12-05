import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const font = 'Nunito, sans-serif';
const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      light: "#49EE73",
      dark: "#00A32A",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#182e49",
    },
    white:{
       900:"#ffffff"
    },
    orange:{
      500:'#F4976C'
    }
  },
  typography: {
    fontFamily: font,
  }
});


export default theme;