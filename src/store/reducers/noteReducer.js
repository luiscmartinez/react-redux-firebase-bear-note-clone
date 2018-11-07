import { FETCH_NOTE } from '../actions/types'

const noteReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_NOTE:
      return action.payload
    default:
      return state
  }
}

export default noteReducer
