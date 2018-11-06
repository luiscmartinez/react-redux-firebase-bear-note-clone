import { db } from '../../views/NoteListContainer'

import { CREATE_NOTE, FETCH_NOTES, UPDATE_NOTE } from './types'

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

export const deleteNote = id => dispatch => {
  db
    .collections('notes')
    .doc(id)
    .delete()
    .then(() => dispatch({ type: UPDATE_NOTE, payload: id }))
}
