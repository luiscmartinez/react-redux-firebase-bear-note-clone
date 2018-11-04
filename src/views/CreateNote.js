import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

class CreateNote extends Component {
  state = {
    title: '',
    content: ''
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.createNote(this.state)
    this.props.history.push('/')
  }
  render () {
    const { title, content } = this.state
    return (
      <div className='createNote'>
        <nav className='nav'>
          <Link to='/'>ARROW</Link>
          <button>UPLOAD</button>
          <button>INFO</button>
        </nav>
        <form onSubmit={this.handleSubmit}>
          <input
            name='title'
            type='text'
            value={title}
            placeholder='Enter title'
            onChange={this.handleChange}
          />
          <textarea
            name='content'
            type='text'
            value={content}
            placeholder='Enter content'
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(null, actions)(CreateNote)
