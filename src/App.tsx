import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.scss'

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
    <Layout/>
    <Switch>
      <Redirect to='/home' />
      {routeComponents}
    </Switch>
  </Router>
)

export default App
