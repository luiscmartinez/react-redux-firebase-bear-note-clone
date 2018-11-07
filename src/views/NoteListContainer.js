import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import { Menu, Search, PlusSquare } from 'react-feather'
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { TweenMax } from 'gsap'
moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('ss', 5)
moment.relativeTimeThreshold('m', 60)
moment.relativeTimeThreshold('h', 20)
moment.relativeTimeThreshold('d', 25)
moment.relativeTimeThreshold('M', 10)

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: 'just now',
    ss: '%ds',
    m: '%dm',
    mm: '%dm',
    h: '%dh',
    hh: '%dh',
    d: '%dD',
    dd: '%dD',
    M: '%dW',
    MM: '%dW',
    y: '%dY',
    yy: '%dY'
  }
})

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

class NoteListContainer extends Component {
  constructor (props) {
    super(props)
    this.list = []
  }

  handleCreateNote = () => {
    this.props.history.push('/create')
  }

  componentDidMount () {
    this.props.fetchNotes()
    TweenMax.staggerFrom(this.list, 2, { y: 100, autoAlpha: 0 }, 0.2)
  }

  render () {
    const { notes } = this.props
    return (
      <div className='note-list'>
        <div className='note-list-animated'>
          <nav className='navbar'>
            <button className='nav-menu'>
              <Menu color='#9F9F9F' size='20px' />
            </button>
            <h1 className='nav-title'>
              NOTES
            </h1>
            <button className='nav-search'>
              <Search color='#9F9F9F' size='20px' />
            </button>
          </nav>
          <ul className='note-list'>
            {notes.map((note, i) => (
              <li
                className='note-container'
                key={note.id}
                note={note}
                ref={li => (this.list[i] = li)}
              >
                <div className='note-moment'>
                  {moment(note.createdAt).fromNow()}
                </div>
                <div className='note'>
                  <h2 className='note-title'>
                    {note.title}
                  </h2>
                  <p className='note-content'>
                    {note.content}
                  </p>
                </div>
                <button
                  className='note-nav'
                  onClick={() => {
                    this.props.deleteNote(note.id)
                    this.props.fetchNotes()
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <button className='new-note' onClick={this.handleCreateNote}>
            <PlusSquare color='white' size='30px' />
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ notes }) => ({
  notes
})

export default connect(mapStateToProps, actions)(NoteListContainer)
