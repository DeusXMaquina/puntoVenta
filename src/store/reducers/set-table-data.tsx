const setTableData = (state = [], action:any) => {
  switch (action.type) {
    case 'SET_TABLE_DATA':
      return action.tableData
    default:
      return state
  }
}

export default setTableData
