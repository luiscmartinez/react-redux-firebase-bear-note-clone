import axios from 'axios'
import { db } from '../App'

export const FETCH_NOTES = 'FETCH_NOTES'

export const fetchNotes = () => dispatch => {
  db.collection('notes').get().then(querySnapshot => {
    const docArr = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    dispatch({ type: FETCH_NOTES, payload: docArr })
  })
}
