import { db } from '../views/NoteListContainer'

export const FETCH_NOTES = 'FETCH_NOTES'
export const CREATE_NOTE = 'CREATE_NOTE'

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
  db
    .collection('notes')
    .add(note)
    .then(docRef =>
      dispatch({ type: CREATE_NOTE, payload: { ...note, id: docRef.id } })
    )
    .catch(error => {
      console.error('Error adding document: ', error)
    })
}
