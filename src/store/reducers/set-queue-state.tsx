const initialState: any = {
  path: '',
  name: 'Please select a queue that you wish to modify'
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
