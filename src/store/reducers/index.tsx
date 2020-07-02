import { combineReducers } from 'redux'

import setQueueState from './set-queue-state'
import toggleMenuDrawer from './toggle-menu-drawer'
import setTableData from './set-table-data'

const rootReducer = combineReducers({
  queue: setQueueState,
  toggleMenu: toggleMenuDrawer,
  tableData: setTableData
})

export default rootReducer
