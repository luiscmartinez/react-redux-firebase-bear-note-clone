import { db } from '../views/NoteListContainer'

export const FETCH_NOTES = 'FETCH_NOTES'
export const CREATE_NOTE = 'CREATE_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'

export const fetchNotes = () => dispatch => {
  db.collection('notes').get().then(querySnapshot => {
    const docArr = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    dispatch({ type: FETCH_NOTES, payload: docArr })
  })
}

export const createNote = note => dispatch => {
  note.createdAt = Date.now()
  db
    .collection('notes')
    .add(note)
    .then(docRef => {
      return dispatch({
        type: CREATE_NOTE,
        payload: { ...note, id: docRef.id }
      })
    })
    .catch(error => {
      console.error('Error adding document: ', error)
    })
}

export const updateNote = note => dispatch => {
  db
    .collections('notes')
    .doc(note.id)
    .set(note)
    .then(() => dispatch({ type: UPDATE_NOTE, payload: note }))
}
