import axios from 'axios'

export const FETCH_NOTES = 'FETCH_NOTES'

export const fetchNotes = () => dispatch => {
  axios
    .get('https://fe-notes.herokuapp.com/note/get/all')
    .then(res => {
      console.log(res.data)
      dispatch({ type: FETCH_NOTES, payload: res.data })
    })
    .catch(err => console.error(err))
}
