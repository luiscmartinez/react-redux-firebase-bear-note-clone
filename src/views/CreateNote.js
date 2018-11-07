import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import { ChevronLeft, Share, Info } from 'react-feather'
class CreateNote extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: ''
    }
    this.container = null
    this.input = null
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    const { title, content } = this.state
    e.preventDefault()
    if (!title.trim() || !content.trim()) return this.props.history.push('/')
    this.props.createNote(this.state)
    this.props.history.push('/')
  }

  componentDidMount () {
    // TweenLite.from(this.container, 1, {
    //   left: '100%',
    //   ease: Power1.easeOut,
    //   onComplete: () => this.input.focus()
    // })
  }

  render () {
    const { title, content } = this.state
    return (
      <div className='create-note'>
        <div
          className='create-note-animated'
          ref={ref => (this.container = ref)}
        >
          <nav className='nav'>
            <Link onClick={this.handleSubmit} className='left-chevron' to='/'>
              <ChevronLeft />
            </Link>
            <div className='nav-right'>
              <button className='menu-share'><Share /></button>
              <button className='menu-info'><Info /></button>
            </div>

          </nav>
          <div className='noteContent'>
            <div className='markdown'>H1</div>
            <form className='form-newNote' onSubmit={this.handleSubmit}>
              <input
                className='createTitle'
                name='title'
                type='text'
                value={title}
                placeholder='Enter title'
                onChange={this.handleChange}
                ref={input => (this.input = input)}
              />
              <textarea
                className='createContent'
                name='content'
                type='text'
                value={content}
                placeholder='Enter content'
                onChange={this.handleChange}
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(CreateNote)
