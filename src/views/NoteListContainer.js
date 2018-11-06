import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import { Menu, Search, PlusSquare } from 'react-feather'
import moment from 'moment'
import firebase from 'firebase'
import { TweenLite, Power1 } from 'gsap/all'

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
    this.container = null
  }

  handleCreateNote = () => {
    TweenLite.to(this.container, 1, {
      left: '-100%',
      ease: Power1.easeOut,
      onComplete: () => this.props.history.push('/create')
    })
  }

  componentDidMount () {
    this.props.fetchNotes()
    TweenLite.from(this.container, 1, {
      left: '-100%',
      ease: Power1.easeOut
    })
  }

  render () {
    const { notes } = this.props
    return (
      <div className='note-list'>
        <div
          className='note-list-animated'
          ref={container => (this.container = container)}
        >
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
            {notes.map(note => (
              <li className='note-container' key={note.id} note={note}>
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
