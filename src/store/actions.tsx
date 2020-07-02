import { TableRow } from "../assets/models/table-row.interface"

export const setQueue = (item: { path: string, name: string }) => (
  { type: 'SET_QUEUE', item }
)

export const toggleMenu = (itemArray: {}) => (
  { type: 'TOGGLE_MENU_DRAWER', itemArray }
)

export const setTableData = (tableData: TableRow[]) => (
  { type: 'SET_TABLE_DATA', tableData }
)
