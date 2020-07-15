import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import store from '../index'
import { connect } from 'react-redux'
import { toggleMenu, setQueue, setTableData } from '../store/actions'
import { TableRow } from '../assets/models/table-row.interface'
import { Paper } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

type Props = {
  queue: {
    path: string,
    name: string
  }
  tableData: TableRow[],
  setTableData: (mappedData: TableRow[]) => TableRow[]
}

const Table = (props:Props) => {
  const [state, setState] = React.useState({
    columns: [
      {title: 'ID', field: 'id'},
      {title: 'Nombre', field: 'nombre'},
      {title: 'Precio de Venta', field: 'precioVenta'},
    ],
    columns2: [
      {title: 'ID', field: 'id'},
      {title: 'Nombre', field: 'nombre'},
      {title: 'Telefono', field: 'precioVenta'},
      {title: 'Correo Electronico', field: 'correoElectronico'}
    ],
    rows: props.tableData
 })

  const [apiData, setApiData] = useState([])

  const [tableInfo, setTableInfo] = useState(true)

  const fetchData = async () => {
    if (props.queue.name === 'Clientes' && tableInfo)
      setTableInfo(!tableInfo)
    else if (props.queue.name === 'Proveedores' && tableInfo)
      setTableInfo(!tableInfo)
    else if (props.queue.name === 'Productos' && !tableInfo)
      setTableInfo(!tableInfo)
    else if (props.queue.name === 'Inventario' && !tableInfo)
      setTableInfo(!tableInfo)
    const apiCall = await fetch(`http://127.0.0.1:5000/`,
      {method:'GET', headers:{'listas': props.queue.name}})
    const apiCallData = await apiCall.json()
      const renderedApiCallData = await apiCallData.map((data: TableRow[]) => {
        return {
          id: data[0],
          nombre: data[1],
          precioVenta: data[2],
          correoElectronico: data[3] ? data[3] : ''
        }
      },
      (err:any) => console.log(err))
      props.setTableData(renderedApiCallData)
      await setApiData(renderedApiCallData)
  }

  useEffect(() => { fetchData()}, [props.queue.name])

  return props.queue.path ? (
    <MaterialTable
      style={{position: 'static'}}
      options={{pageSize: props.tableData.length || 50, pageSizeOptions: [7,25,50,100]}}
      title={props.queue.name}
      columns={tableInfo ? state.columns : state.columns2}
      data={props.tableData}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() =>{
              const requestOptions = {method: 'POST', headers: {'Content-Type': 'application/json', 'listas': props.queue.name }, body: JSON.stringify(newData)}
              fetch(`http://127.0.0.1:5000/${props.queue.name.toLowerCase()}`, requestOptions)
              .then(response => response.json())
              .then(data => fetchData())
              resolve()}, 600)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState: any) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState: any) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
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
  setTableData: (mappedData: TableRow[]) => setTableData(mappedData)
}

export default connect<any, any, any>(mapState, mapDispatch)(Table)