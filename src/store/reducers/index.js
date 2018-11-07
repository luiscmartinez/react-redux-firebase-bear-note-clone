import { combineReducers } from 'redux'
import notes from './notesReducer'
import note from './noteReducer'

export default combineReducers({ notes, note })
