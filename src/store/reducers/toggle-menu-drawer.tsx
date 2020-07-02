const toggleMenuDrawer = (state = [], action: any) => {
  switch (action.type) {
    case 'TOGGLE_MENU_DRAWER':
      return action.itemArray
    default:
      return state
  }
}

export default toggleMenuDrawer