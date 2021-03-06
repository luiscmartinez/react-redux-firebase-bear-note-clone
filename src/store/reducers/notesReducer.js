import { FETCH_NOTES } from '../actions/types'

const notesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return action.payload.sort((a, b) => {
        return Number(b.createdAt) - Number(a.createdAt)
      })
    default:
      return state
  }
}

export default notesReducer
