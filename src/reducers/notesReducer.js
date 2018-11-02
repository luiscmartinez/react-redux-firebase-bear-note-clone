import { FETCH_NOTES } from '../actions'

const notesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return action.payload
    default:
      return state
  }
}

export default notesReducer
