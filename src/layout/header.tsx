import * as React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import Theme from '../assets/theme'
import { ThemeProvider } from '@material-ui/styles'
import './layout.scss'

export default class Header extends React.Component {
// state = {
//    tabs: []
// }

  render () {
    return (
      <ThemeProvider theme={Theme}>
        <AppBar position='static' className='header'>
          <Toolbar color='primary.main'>
            <Typography variant='h6'> Punto de Venta PV </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    )
  }
}
