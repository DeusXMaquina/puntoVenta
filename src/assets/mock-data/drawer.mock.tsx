import { DropdownMenu } from '../models/dropdown.interface'

const MenuTree: DropdownMenu[] = [{
    id: 'Listas',
    name: 'Listas e Inventarios',
    children: [{
      id: 'ListaProductos',
      name: 'Productos',
      path: '/listas/productos'
    }, {
      id: 'ListaClientes',
      name: 'Clientes',
      path: '/listas/clientes'
    }, {
      id:'ListaProveedores',
      name: 'Proveedores',
      path: '/listas/proveedores'
    }, {
      id: 'ListaInvetario',
      name: 'Inventario',
      path: '/listas/inventario'
    }]
  }, {
    id: 'Compra/Venta',
    name: 'Compra/Venta',
    children: [{
      id: 'Compras',
      name: 'Compras',
      path: '/compraVenta/compras'
    }, {
      id: 'Ventas',
      name: 'Ventas',
      path: '/CompraVenta/ventas'
    }]
  }]

export default MenuTree