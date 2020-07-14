import React from 'react'
import './App.scss'
import Layout from './layout/layout'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import Table from './components/table'
import { connect } from 'react-redux'

const routes = [
  { path: '/compraVenta/compras' },
  { path: '/compraVenta/ventas' },
  { path: '/listas/productos' },
  { path: '/listas/clientes' },
  { path: '/listas/proveedores' },
  { path: '/listas/inventario' }
]

const routeComponents = routes.map(({ path }, key) => <Route exact path={path} key={key} />)
const App = () => (
  <Router>
    <Layout />
    <Switch>
      <Redirect to='/home' />
      {routeComponents}
    </Switch>
  </Router>
)

export default connect()(App)
