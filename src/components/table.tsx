import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import store from '../index'
import { connect } from 'react-redux'
import { toggleMenu, setQueue, setTableData } from '../store/actions'
import { TableRowProducts } from '../assets/models/table-row.interface'
import { Paper } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

// type Props = {
//   queue: {
//     path: string,
//     name: string
//   }
//   tableData: TableRow[],
//   setTableData: (mappedData: TableRow[]) => TableRow[]
// }

const Table = (props?: any) => {
  const [state, setState] = React.useState({
    columns: [
      {title: 'ID', field: 'id'},
      {title: 'Nombre', field: 'nombre'},
      {title: 'precio de Venta', field: 'precioVenta'}
    ],
    rows: props.tableData
  })
}

export default Table
