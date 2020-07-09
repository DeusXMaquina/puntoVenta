const initialState: any = {
  path: '',
  name: 'Por favor selecciona la lista que deseas ver'
}

const setQueueState = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_QUEUE':
      return action.item
    default:
      return state
  }
}

export default setQueueState
