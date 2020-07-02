import { createMuiTheme } from '@material-ui/core/styles'

const Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#33ab9f',
      main: '#046EDC',
      dark: '#00695f',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ab003c',
      main: '#f50057',
      dark: '#f73378',
      contrastText: '#fff'
    }
  }
})

export default Theme
