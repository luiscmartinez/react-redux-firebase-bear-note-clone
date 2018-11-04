import { FETCH_NOTES, CREATE_NOTE } from '../actions'

const notesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return action.payload.sort((a, b) => {
        return Number(a.createdAt) - Number(b.createdAt)
      })
    default:
      return state
  }
}

export default notesReducer
