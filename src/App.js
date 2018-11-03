import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import styled from 'styled-components'
import { Menu, Search, PlusSquare } from 'react-feather'
import moment from 'moment'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDqL8yTHEV2iRUOjDNAwdMLPYBYQlUY1vU',
  authDomain: 'bear-note-app.firebaseapp.com',
  databaseURL: 'https://bear-note-app.firebaseio.com',
  projectId: 'bear-note-app',
  storageBucket: 'bear-note-app.appspot.com',
  messagingSenderId: '365864384527'
}

firebase.initializeApp(config)

export const db = firebase.firestore()

db.settings({ timestampsInSnapshots: true })

const Container = styled.div`
display: flex;
flex-flow: column;
min-height: 100vh;
width: 100%;
position: relative;
background-color: #FBFBFB;
`

const NavBar = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
  width: 100%;
  height: 50px;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  opacity:1;
  background-color: #FBFBFB;
`

const MenuButton = styled.button`
width: 50px;
height: 50px;
background-color: transparent;
border: 0px;
`

const SearchButton = styled.button`
width: 50px;
height: 50px;
background-color: transparent;
border: 0px;
`
const NavTitle = styled.h1`
display: flex;
justify-content: center;
align-items: center;
font-size: 1.2rem;
height: 100%;
flex-grow: 1;
font-family: Roboto;
color: darkslategray;
`

const NoteList = styled.ul`
min-height: 100vh;
height: 100%;
width: 100%;
background-color: #FBFBFB;

`

const NoteContainer = styled.li`
display: flex;
min-height: 100px;
width: 100%;
margin-top: 20px;
`

const NoteMoment = styled.div`
width: 30%;
color: darkgrey;
font-size: 0.8rem;
margin-left: 10px;
`

const Note = styled.div`
width: 70%;
border-bottom: 1px solid gray;
overflow: hidden;
`

const NoteTitle = styled.h1`
margin-bottom: 10px;
font-size: 1.4rem;
font-weight: bold;
`

const NoteTextBody = styled.p`
padding: 10px 0;
`

const NewNote = styled.button`
position: fixed;
bottom: 10px;
right: 10px;
height: 60px;
width: 60px;
border-radius: 50%;
background-color: #C14D50;
`
class App extends Component {
  componentDidMount () {
    this.props.fetchNotes()
  }
  render () {
    const { notes } = this.props
    return (
      <Container>
        <NavBar>
          <MenuButton>
            <Menu color='#9F9F9F' size='20px' />
          </MenuButton>
          <NavTitle>
            NOTES
          </NavTitle>
          <SearchButton>
            <Search color='#9F9F9F' size='20px' />
          </SearchButton>
        </NavBar>
        <NoteList>
          {notes.map(note => (
            <NoteContainer key={note.id} note={note}>
              <NoteMoment>
                {moment().startOf('hour').fromNow()}
              </NoteMoment>
              <Note>
                <NoteTitle>
                  {note.title}
                </NoteTitle>
                <NoteTextBody>
                  {note.content}
                </NoteTextBody>
              </Note>
              <NewNote>
                <PlusSquare color='white' size='30px' />
              </NewNote>
            </NoteContainer>
          ))}
        </NoteList>
      </Container>
    )
  }
}

const mapStateToProps = ({ notes }) => ({
  notes
})

export default connect(mapStateToProps, actions)(App)
