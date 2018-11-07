import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import NoteListContainer from './views/NoteListContainer'
import CreateNote from './views/CreateNote'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { TweenMax } from 'gsap/all'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isListNote: true,
      isCreateNote: false
    }
  }

  render () {
    const { location } = this.props
    const { isListNote, isCreateNote } = this.state
    return (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          minHeight: '100vh',
          overflow: 'hidden',
          backgroundColor: 'rgb(250,250,250)',
          border: '1px solid red'
        }}
      >
        <TransitionGroup>
          <CSSTransition
            classNames='fade'
            key={location.key}
            timeout={2000}
            // eslint-disable-next-line
            enter={true}
            // eslint-disable-next-line
            exit={true}
            onEnter={node => {
              TweenMax.killTweensOf(node)
              TweenMax.set(node, {
                position: 'absolute',
                left: isListNote ? '-100%' : '100%',
                opacity: 1
              })

              TweenMax.to(node, 2, {
                position: 'absolute',
                left: isListNote ? 0 : 0,
                opacity: 1,
                onComplete: () =>
                  this.setState({
                    isListNote: !isListNote,
                    isCreateNote: !isCreateNote
                  })
              })
            }}
            onExit={node => {
              TweenMax.killTweensOf(node)
              TweenMax.set(node, {
                position: 'absolute',
                left: isListNote ? 0 : 0,
                opacity: 1
              })
              TweenMax.to(node, 2, {
                position: 'absolute',
                left: isListNote ? '100%' : '-100%',
                opacity: 1
              })
            }}
          >
            <Switch location={location}>
              <Route
                exact
                path='/'
                render={props => <NoteListContainer {...props} />}
              />
              <Route
                path='/create'
                render={props => <CreateNote {...props} />}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

export default App
