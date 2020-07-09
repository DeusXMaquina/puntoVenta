import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import store from '../index'
import { connect } from 'react-redux'
import { toggleMenu, setQueue, setTableData } from '../store/actions'
import { TableRowProducts } from '../assets/models/table-row.interface'
import { Paper } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

type Props = {
  queue: {
    path: string,
    name: string
  }
  tableData: TableRowProducts[],
  setTableData: (mappedData: TableRowProducts[]) => TableRowProducts[]
}

const Table = (props:Props) => {
  const [state, setState] = React.useState({
    columns: [
      {title: 'ID', name: 'id'},
      {title: 'Nombre', name: 'Nombre'},
      {title: 'Precio de Venta', name: 'precioVenta'}
    ],
    rows: props.tableData
 })

  const [apiData, setApiData] = useState([])

  const fetchData = async () => {
    const apiCall = await fetch('http://127.0.0.1:5000/',
      {method:'GET', headers:{'lista': props.queue.path}})
    const apiCallData = await apiCall.json()
    const renderedApiCallData = await apiCallData.map((data: TableRowProducts[]) => {
      return {
        id: data[0],
        nombre: data[1],
        precioVenta: data[2]
      }
    },
    (err:any) => console.log(err))
    props.setTableData(renderedApiCallData)
    await setApiData(renderedApiCallData)
  }

  useEffect(() => { fetchData()}, [props.queue.path])

  console.log(state)
  console.log(props)

  const listaProductos = [
    {id: 1, nombre: 'jose', precioVenta: 15.00},
    {id: 1, nombre: 'jose', precioVenta: 15.00},
    {id: 1, nombre: 'jose', precioVenta: 15.00}
  ]

  return props.queue.path ? (
    <MaterialTable
      style={{position: 'static'}}
      options={{pageSize: props.tableData.length || 50, pageSizeOptions: [7,25,50,100]}}
      title={props.queue.name}
      columns={state.columns}
      data={props.tableData}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() =>{resolve()}, 600)
          })}} />
  ) : (
    <Paper
      style={{ padding: '2rem', display: 'flex', alignItems: 'center', fontSize: '1.5rem', color: '#00695f' }}>
      <ArrowBackIcon style={{ color: "#00695f" }} /> &nbsp; {props.queue.name}
    </Paper>
 )
}

const mapState = () => ({
  itemArray: store.getState().toggleMenu,
  queue: store.getState().queue,
  tableData: store.getState().tableData
})

const mapDispatch = {
  toggleMenu: (itemArray:{}) => toggleMenu(itemArray),
  setQueue: (itemName: {path:string, name: string}) => setQueue(itemName),
  setTableData: (mappedData: TableRowProducts[]) => setTableData(mappedData)
}

export default connect<any, any, any>(mapState, mapDispatch)(Table)