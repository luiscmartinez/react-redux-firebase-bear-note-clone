import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import './App.css'

class App extends Component {
  componentDidMount () {
    this.props.fetchNotes()
  }
  render () {
    return (
      <div className='app'>
        <div className='sidebarContainer'>
          <div className='preferenceContainer'>
            <i className='fas fa-cloud' />
            <i className='fas fa-sliders-h' />
          </div>
          <div className='noteListContainer'>
            {/* //* list of untagged
            //* list of todo
            //* list of today's notes */}
          </div>
        </div>
        <div className='notesContainer'>
          <div className='searchContainer'>
            <input className='searchNotes' placeholder='Search Notes' />
            <i className='newNote far fa-edit fa-2x' />
          </div>
          <div className='listContainer'>
            {this.props.notes.map(note => (
              <div
                style={{
                  height: '95px',
                  overflow: 'hidden',
                  margin: '19px',
                  borderBottom: '1px solid darkgrey'
                }}
              >
                <h3 style={{ marginLeft: '10px', marginBottom: '10px' }}>
                  {note.title}
                </h3>
                <p>
                  {note.textBody}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className='noteContainer'>3</div>
        <div className='noteSideNav'>
          <div className='sideNav-top'>
            <i className='infoIcon fas fa-info-circle' />
            <i className='uploadIcon fas fa-file-upload' />
            <i className='trashIcon fas fa-trash' />
          </div>
          <div className='sideNav-bot'>
            <i className='editIcon fas fa-pen-square' />
            <i className='layoutIcon fas fa-window-restore' />{' '}
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ notes }) => ({
  notes
})

export default connect(mapStateToProps, actions)(App)
