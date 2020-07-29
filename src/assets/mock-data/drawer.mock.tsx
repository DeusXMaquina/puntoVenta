import { DropdownMenu } from '../models/dropdown.interface'

const MenuTree: DropdownMenu[] = [{
    id: 'Listas',
    name: 'Listas e Inventarios',
    children: [{
      id: 'productos',
      name: 'Productos',
      path: '/listas/productos'
    }, {
      id: 'clientes',
      name: 'Clientes',
      path: '/listas/clientes'
    }, {
      id:'proveedores',
      name: 'Proveedores',
      path: '/listas/proveedores'
    }, {
      id: 'inventario',
      name: 'Inventario',
      path: '/listas/inventario'
    }]
  }/* , {
    id: 'Compra/Venta',
    name: 'Compra/Venta',
    children: [{
      id: 'compras',
      name: 'Compras',
      path: '/compraVenta/compras'
    }, {
      id: 'ventas',
      name: 'Ventas',
      path: '/CompraVenta/ventas'
    }]
  } */]

export default MenuTree