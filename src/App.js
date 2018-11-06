import React, { Component, Fragment } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import NoteListContainer from './views/NoteListContainer'
import CreateNote from './views/CreateNote'

class App extends Component {
  render () {
    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path='/'
            render={props => (
              <NoteListContainer {...props} show={props.match !== null} />
            )}
          />
          <Route
            path='/create'
            render={props => (
              <CreateNote {...props} show={props.match !== null} />
            )}
          />
        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App)
